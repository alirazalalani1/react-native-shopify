import {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Button, Container, ImagesCarousel, Typography} from '../../components';
import {ProductDetailProps} from '../../config/type/navigation';
import {fetchSingleProduct} from '../../shopify';
import {Colors, Metrix} from '../../config';
import {styles} from './style';

export interface ProductType {
  id: string;
  title: string;
  description: string;
  images: {src: string}[];
  availableForSale?: boolean;
}

const ProductDetail = ({route}: ProductDetailProps) => {
  const {productId} = route.params;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [description, setDescription] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleProduct(productId);
        setProduct(data);
        if (data?.description) {
          const splittedDesc = data?.description.split('. ');
          setDescription(splittedDesc);
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingHorizontal: Metrix.HorizontalSize(24),
          backgroundColor: Colors.white,
        }}>
        <ImagesCarousel data={product?.images} />

        {product?.availableForSale && (
          <View style={styles.saleBadgeCont}>
            <Typography
              mL={-3}
              textAlign="center"
              medium
              size={15}
              color={Colors.black}>
              Sale
            </Typography>
          </View>
        )}

        <View style={styles.wishlistCont}>
          <Icon
            name="hearto"
            style={{textAlign: 'center'}}
            size={18}
            color={Colors.darkgreen}
          />
        </View>
        <Typography mT={20} bold size={22} color={Colors.primary}>
          {product?.title}
        </Typography>

        {description.map((desc, i) => {
          return (
            <Typography
              key={i}
              lineHeight={18}
              mT={20}
              size={15}
              color={Colors.text}>
              {desc}.
            </Typography>
          );
        })}

        <Button title="Add to Cart" mT={24} mB={32} />
      </ScrollView>
    </>
  );
};

export default ProductDetail;
