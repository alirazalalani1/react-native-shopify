import {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Button, Flex, ImagesCarousel, Typography} from '../../components';
import {ProductDetailProps} from '../../config/type/navigation';
import {fetchSingleProduct} from '../../shopify';
import {Colors} from '../../config';
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

  console.log('image', product?.images[3]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImagesCarousel data={product?.images} />

      {product?.availableForSale && (
        <View style={styles.saleBadgeCont}>
          <Typography textAlign="center" medium size={15} color={Colors.black}>
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
            <TouchableOpacity hitSlop={styles.hitSlop}>
              <Typography size={24} light>
                -
              </Typography>
            </TouchableOpacity>
            <Typography size={18} light>
              0
            </Typography>
            <TouchableOpacity hitSlop={styles.hitSlop}>
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

      <Button title="+ Add to Cart" mT={24} mB={32} />
    </ScrollView>
  );
};

export default ProductDetail;
