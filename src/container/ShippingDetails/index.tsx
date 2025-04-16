import {useState} from 'react';
import {Linking, View} from 'react-native';
import {useSelector} from 'react-redux';

import {
  BackHeader,
  Button,
  Flex,
  InputField,
  Typography,
} from '../../components';
import {Colors} from '../../config';
import {IRootState} from '../../store';
import styles from './style';

const ShippingDetails = () => {
  const {checkoutURL} = useSelector((state: IRootState) => state.app);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    country: '',
  });

  const checkoutHandler = async () => {
    checkoutURL && Linking.openURL(checkoutURL);
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
        value={shippingData.mobile}
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
        value={shippingData.address}
        onChange={(text: string) =>
          setShippingData(prev => ({...prev, address: text}))
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
        title="Checkout"
        mT={32}
        mB={100}
        onPress={() => {
          console.log('valuess', shippingData);
          checkoutHandler();
        }}
      />
    </View>
  );
};

export default ShippingDetails;
