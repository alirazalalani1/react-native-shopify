import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
      <View style={styles.saleBadgeCont}>
        <Typography textAlign="center" medium size={11} color={Colors.white}>
          SALE
        </Typography>
      </View>
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
    position: 'relative',
  },

  saleBadgeCont: {
    width: Metrix.HorizontalSize(50),
    padding: Metrix.HorizontalSize(4),
    backgroundColor: '#a3d2a2',
    position: 'absolute',
    overflow: 'hidden',
    // top: Metrix.VerticalSize(20),
    // borderRadius: 4,
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
