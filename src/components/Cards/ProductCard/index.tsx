import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Colors, Metrix} from '../../../config';
import {Flex, Typography} from '../../index';

export interface Variant {
  priceV2?: {
    amount: string;
  };
}

interface ImageData {
  src: string;
}

interface ProductItem {
  id: string;
  images: ImageData[];
  title: string;
  variants: Variant[];
}

interface Props {
  item: ProductItem;
}

const ProductCard: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  const data = item?.node;
  const imageData = item?.node?.images?.edges;

  console.log(item?.node?.variants?.edges[0]?.node?.priceV2?.amount);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={Metrix.ActiveOpacity}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          productId: data.id,
          amount: item?.node?.variants?.edges[0]?.node?.priceV2?.amount || 0,
        })
      }>
      <Image
        source={{uri: imageData[0]?.node?.src}}
        style={{width: 100, height: 100}}
      />

      <Typography bold color={Colors.textV2} numberOfLines={1}>
        {data.title}
      </Typography>

      <Flex justifyContent="space-between" gap={8} mT={4}>
        {item?.node?.variants?.edges?.length > 0 && (
          <Typography size={14} bold color={Colors.greyV8}>
            £{item?.node?.variants?.edges[0]?.node?.priceV2?.amount}
          </Typography>
        )}

        <Icon name="arrowright" size={16} color={Colors.greyV8} />
      </Flex>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: Metrix.HorizontalSize(155),
    height: Metrix.VerticalSize(200),
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greyV4,
    marginBottom: Metrix.VerticalSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
