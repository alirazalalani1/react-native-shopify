import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppStackParamList} from '../../../config/type/navigation';

import {Colors, Metrix} from '../../../config';
import {Flex, Typography} from '../../index';
import {Images} from '../../../config/images';
import styles from './style';

interface ProductItem {
  node: {
    id: string;
    images: {
      edges: {node: {src: string}}[];
    };
    title: string;
    variants: {
      edges: {node: {priceV2?: {amount: string}}}[];
    };
  };
}

interface Props {
  item: ProductItem;
}

const ProductCard: React.FC<Props> = ({item}) => {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'ProductDetail'>>();
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

      <View
        style={{
          position: 'absolute',
          top: Metrix.VerticalSize(10),
          left: Metrix.HorizontalSize(10),
        }}>
        <Flex gap={2}>
          <Image source={Images.RatingStar} style={styles.starIcon} />
          <Typography mT={2} size={14} medium>
            5.0
          </Typography>
        </Flex>
      </View>
      <Image
        source={{uri: imageData[0]?.node?.src}}
        style={{
          width: Metrix.HorizontalSize(120),
          height: Metrix.HorizontalSize(120),
          backgroundColor: 'pink',
        }}
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
