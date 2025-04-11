import {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  BackHeader,
  Button,
  Flex,
  ImagesCarousel,
  Typography,
} from '../../components';
import {ProductDetailProps} from '../../config/type/navigation';
import {fetchSingleProduct} from '../../shopify';
import {Colors} from '../../config';
import {ADD_TO_CART, CREATE_CART} from '../../graphQL';
import styles from './style';

export interface ProductType {
  id: string;
  title: string;
  description: string;
  images: {src: string}[];
  availableForSale?: boolean;
}

const ProductDetail = ({route}: ProductDetailProps) => {
  const {productId, amount} = route.params;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [description, setDescription] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleProduct(productId);
        setProduct(data);
        if (data?.description) {
          setDescription(data.description.split('. '));
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
      }
    };
    fetchData();
  }, []);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev - 1);
  };

  const [createCart] = useMutation(CREATE_CART, {
    onCompleted: async data => {
      const cartId = data?.cartCreate?.cart?.id;
      await AsyncStorage.setItem('cartId', cartId);
    },
    onError: error => {
      console.error('Error creating cart:', error);
    },
  });

  const [addToCart] = useMutation(ADD_TO_CART);

  const addToCartHandler = async () => {
    const cartId = await AsyncStorage.getItem('cartId');
    await addToCart({
      variables: {
        cartId,
        lines: [
          {
            quantity,
            merchandiseId: product?.variants[0]?.id,
          },
        ],
      },
      onCompleted: data => {
        console.log(
          'Add to cart response:',
          data?.cartLinesAdd?.cart?.lines?.edges[0]?.node,
        );
      },
      onError: error => {
        console.error('Error adding to cart:', error);
      },
    });

    if (cartId) {
      console.log('Cart ID:', cartId);
    } else {
      createCart();
    }
  };

  console.log('Product:', product?.variants[0]?.id);

  return (
    <>
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ImagesCarousel data={product?.images} />

        {product?.availableForSale && (
          <View style={styles.saleBadgeCont}>
            <Typography
              textAlign="center"
              medium
              size={15}
              color={Colors.black}>
              Sale
            </Typography>
          </View>
        )}

        <Flex mT={20} justifyContent="space-between" alignItems="center">
          <Typography bold size={22} color={Colors.primary}>
            {product?.title}
          </Typography>
          <View style={styles.wishlistCont}>
            <Icon name="hearto" size={16} color={Colors.darkgreen} />
          </View>
        </Flex>

        <Flex gap={10}>
          <Typography color={Colors.green} bold size={14}>
            IN STOCK
          </Typography>
          <Flex alignItems="center" gap={4}>
            <Typography size={14}>5.0</Typography>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.starIcon}
            />
          </Flex>
        </Flex>

        {amount > 0 && (
          <Flex justifyContent="space-between">
            <Typography size={18} mT={16} bold color={Colors.black}>
              £{amount}
            </Typography>
            <Flex
              style={styles.counterContainer}
              justifyContent="space-around"
              alignItems="center">
              <TouchableOpacity
                hitSlop={styles.hitSlop}
                onPress={decreaseQuantity}>
                <Typography size={24} light>
                  -
                </Typography>
              </TouchableOpacity>
              <Typography size={18} light>
                {quantity === 0 ? '0' : quantity}
              </Typography>
              <TouchableOpacity
                hitSlop={styles.hitSlop}
                onPress={increaseQuantity}>
                <Typography size={24} light>
                  +
                </Typography>
              </TouchableOpacity>
            </Flex>
          </Flex>
        )}

        {description.map((desc, i) => (
          <Typography
            key={i}
            lineHeight={18}
            mT={20}
            size={15}
            color={Colors.text}>
            {desc}.
          </Typography>
        ))}

        <Button
          title="+ Add to Cart"
          mT={24}
          mB={32}
          onPress={() => {
            addToCartHandler();
          }}
        />
      </ScrollView>
    </>
  );
};

export default ProductDetail;
