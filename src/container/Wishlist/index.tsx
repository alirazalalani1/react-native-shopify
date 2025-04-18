import {Image, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';

import {Button, Flex, Typography} from '../../components';
import {Colors, Metrix, NavigationService} from '../../config';
import {Screens} from '../../utils/Screens';
import {GET_CART, REMOVE_CART, UPDATE_CART} from '../../graphQL';
import {IRootState} from '../../store';
import styles from './style';

const Wishlist = () => {
  const {cartId} = useSelector((state: IRootState) => state.app);
  const [updateCart] = useMutation(UPDATE_CART);
  const [removeCart] = useMutation(REMOVE_CART);

  const {data} = useQuery(GET_CART, {
    variables: {
      cartId: cartId,
    },
    skip: !cartId,
  });

  const handleUpdateCart = (quantity: number, id: number) => {
    updateCart({
      variables: {
        cartId,
        lines: [{id: id, quantity: quantity}],
      },
      refetchQueries: [{query: GET_CART, variables: {cartId}}],
      onCompleted: () => {
        console.log('updted succesfully');
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  const handleRemove = (lineId: string) => {
    removeCart({
      variables: {
        cartId,
        lineIds: [lineId],
      },
      refetchQueries: [{query: GET_CART, variables: {cartId}}],
      onCompleted: data => {
        console.log('removed succesfully', data);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Typography size={22} bold mT={32} color={Colors.primary}>
          Your Orders
        </Typography>
        <Typography medium mT={10} color={Colors.textV2}>
          Total Items: {data?.cart?.totalQuantity}{' '}
        </Typography>

        <Typography size={15} medium mT={4} color={Colors.black}>
          Cost: £{data?.cart?.cost?.subtotalAmount?.amount}
        </Typography>

        <View style={styles.freeTextContainer}>
          <Typography textAlign="center" size={14} medium>
            Free Shipping For Orders Over £100
          </Typography>
        </View>

        {data?.cart?.lines?.edges?.map((item: any) => {
          const quantity = item.node.quantity;
          return (
            <Flex gap={6} style={styles.cartedItemCard} key={item.node.id}>
              <Image
                source={{
                  uri: item?.node?.merchandise?.image?.url,
                }}
                style={styles.productImage}
              />

              <View style={styles.cardContent}>
                <Flex justifyContent="space-between">
                  <Typography bold color="#000">
                    {item?.node?.merchandise?.product?.title}
                  </Typography>

                  <TouchableOpacity
                    onPress={() => handleRemove(item.node.id)}
                    hitSlop={Metrix.HitSlop}>
                    <Typography>x</Typography>
                  </TouchableOpacity>
                </Flex>

                <Typography size={15} medium color={Colors.textV2} mT={6}>
                  Price: £{item?.node?.merchandise?.priceV2?.amount}
                </Typography>

                <View style={styles.counterRow}>
                  <TouchableOpacity
                    hitSlop={Metrix.HitSlop}
                    style={styles.counterButton}
                    onPress={() => {
                      handleUpdateCart(quantity - 1, item.node.id);
                    }}>
                    <Typography size={17} textAlign="center">
                      -
                    </Typography>
                  </TouchableOpacity>
                  <Typography size={18} light>
                    {quantity}
                  </Typography>
                  <TouchableOpacity
                    hitSlop={Metrix.HitSlop}
                    style={styles.counterButton}
                    onPress={() => {
                      handleUpdateCart(quantity + 1, item.node.id);
                    }}>
                    <Typography size={17} textAlign="center">
                      +
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </Flex>
          );
        })}
      </View>

      <Button
        title="Buy Now"
        mT={16}
        mB={100}
        onPress={() => {
          const variantId = data?.cart?.lines?.edges[0]?.node?.merchandise?.id;
          // checkoutHandler();
          NavigationService.navigate(Screens.ShippingDetails, {variantId});
        }}
      />
    </View>
  );
};

export default Wishlist;
