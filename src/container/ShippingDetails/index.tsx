import {useEffect, useState} from 'react';
import {Linking, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';

import {
  BackHeader,
  Button,
  Flex,
  InputField,
  Typography,
} from '../../components';
import {Colors} from '../../config';
import {IRootState} from '../../store';
import {
  CREATE_CUSTOMER_ADDRESS,
  CART_BUYER_IDENTITY_UPDATE,
} from '../../graphQL';
import styles from './style';

const ShippingDetails = () => {
  const {checkoutURL, cartId} = useSelector((state: IRootState) => state.app);
  const {token, user} = useSelector((state: IRootState) => state.auth);

  const [createAddress] = useMutation(CREATE_CUSTOMER_ADDRESS);
  const [cartBuyerIdentityUpdate] = useMutation(CART_BUYER_IDENTITY_UPDATE);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    city: '',
    province: '',
    zip: '',
    country: 'GB',
  });

  useEffect(() => {
    if (user?.customer) {
      const {firstName, lastName, phone} = user.customer;
      const defaultAddress = user.customer.addresses?.nodes[0];

      setShippingData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        phone: phone || '',
        address1: defaultAddress?.address1 || '',
        city: defaultAddress?.city || '',
        province: defaultAddress?.province || '',
        zip: defaultAddress?.zip || '',
        country: defaultAddress?.country || 'GB',
      }));
    }
  }, [user]);

  const handleCheckout = async () => {
    try {
      await createAddress({
        variables: {
          customerAccessToken: token,
          address: shippingData,
        },
      });

      const cartAddress = {
        address1: shippingData.address1,
        address2: '',
        city: shippingData.city,
        company: '',
        country: shippingData.country,
        firstName: shippingData.firstName,
        lastName: shippingData.lastName,
        phone: shippingData.phone,
        province: shippingData.province,
        zip: shippingData.zip,
      };

      await cartBuyerIdentityUpdate({
        variables: {
          cartId,
          address: cartAddress,
        },
      });

      if (checkoutURL) {
        Linking.openURL(checkoutURL);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };
  return (
    <View style={styles.container}>
      <BackHeader />
      <Typography size={22} bold mT={10} color={Colors.primary}>
        Shipping Details
      </Typography>

      <Flex mT={16} gap={10}>
        <View style={{flex: 0.5}}>
          <Typography mB={10} semiBold>
            First Name
          </Typography>
          <InputField
            placeholder="John"
            value={shippingData.firstName}
            onChange={(text: string) =>
              setShippingData(prev => ({...prev, firstName: text}))
            }
          />
        </View>

        <View style={{flex: 0.5}}>
          <Typography mB={10} semiBold>
            Last Name
          </Typography>
          <InputField
            placeholder="Davis"
            value={shippingData.lastName}
            onChange={(text: string) =>
              setShippingData(prev => ({...prev, lastName: text}))
            }
          />
        </View>
      </Flex>

      <Typography mT={16} mB={10} semiBold>
        Mobile
      </Typography>
      <InputField
        numPad
        placeholder="123456789"
        value={shippingData.phone}
        onChange={(text: string) =>
          setShippingData(prev => ({...prev, mobile: text}))
        }
      />

      <Typography size={22} bold mT={16} color={Colors.primary}>
        Address Details
      </Typography>

      <Flex mT={16} gap={10}>
        <View style={{flex: 0.5}}>
          <Typography mB={10} semiBold>
            Country
          </Typography>
          <InputField
            placeholder="John"
            value={shippingData.country}
            onChange={(text: string) =>
              setShippingData(prev => ({...prev, country: text}))
            }
          />
        </View>

        <View style={{flex: 0.5}}>
          <Typography mB={10} semiBold>
            City
          </Typography>
          <InputField
            placeholder="Davis"
            value={shippingData.city}
            onChange={(text: string) =>
              setShippingData(prev => ({...prev, city: text}))
            }
          />
        </View>
      </Flex>

      <Typography mT={16} mB={10} semiBold>
        Address
      </Typography>
      <InputField
        placeholder="UK"
        value={shippingData.address1}
        onChange={(text: string) =>
          setShippingData(prev => ({...prev, address1: text}))
        }
      />

      <Flex mT={16} gap={10}>
        <View style={{flex: 0.5}}>
          <Typography mB={10} semiBold>
            Province
          </Typography>
          <InputField
            placeholder="John"
            value={shippingData.province}
            onChange={(text: string) =>
              setShippingData(prev => ({...prev, province: text}))
            }
          />
        </View>

        <View style={{flex: 0.5}}>
          <Typography mB={10} semiBold>
            Postal/Zip
          </Typography>
          <InputField
            placeholder="Davis"
            value={shippingData.zip}
            onChange={(text: string) =>
              setShippingData(prev => ({...prev, zip: text}))
            }
          />
        </View>
      </Flex>

      <Button
        title="Proceed to Payment"
        mT={32}
        mB={100}
        onPress={handleCheckout}
      />
    </View>
  );
};

export default ShippingDetails;
