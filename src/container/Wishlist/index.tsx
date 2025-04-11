import {useEffect, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@apollo/client';

import {GET_CART} from '../../graphQL';
import {Button, Typography} from '../../components';

const Wishlist = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const getCartId = async () => {
      const cartId = await AsyncStorage.getItem('cartId');
      setCartId(cartId);
    };
    getCartId();
  }, []);

  const {data} = useQuery(GET_CART, {
    variables: {
      cartId: cartId,
    },
    skip: !cartId,
  });

  console.log(data?.cart?.lines?.edges?.length);

  const checkoutHandler = async () => {
    const checkoutUrl = await AsyncStorage.getItem('checkoutUrl');
    Linking.openURL(checkoutUrl);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {data?.cart?.lines?.edges?.map((item: any) => {
        console.log('item', item);
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
