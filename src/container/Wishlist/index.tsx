import {Linking, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';

import {GET_CART} from '../../graphQL';
import {Button, Typography} from '../../components';
import {IRootState} from '../../store';

const Wishlist = () => {
  const {cartId, checkoutURL} = useSelector((state: IRootState) => state.app);

  const {data} = useQuery(GET_CART, {
    variables: {
      cartId: cartId,
    },
    skip: !cartId,
  });

  const checkoutHandler = async () => {
    checkoutURL && Linking.openURL(checkoutURL);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {data?.cart?.lines?.edges?.map((item: any) => {
        return (
          <View>
            <Typography color="#000" key={item.node.id}>
              {item.node.merchandise.title}qq
            </Typography>

            <Button
              title="Buy Now"
              width={200}
              mT={16}
              onPress={() => {
                checkoutHandler();
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
