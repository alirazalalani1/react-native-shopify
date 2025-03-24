import {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import {CUSTOMER_LOGIN, GET_CUSTOMER} from '../../graphQL';
import {Button, Container, InputField, Typography} from '../../components';
import {login} from '../../store/slices/auth.slice';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'waleed@nasir.com',
    password: '1234567',
  });

  const dispatch = useDispatch();
  const {email, password} = values;
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [loginUser, {loading}] = useMutation(CUSTOMER_LOGIN, {
    onCompleted: async data => {
      const token =
        data.customerAccessTokenCreate.customerAccessToken?.accessToken;
      const errors = data.customerAccessTokenCreate.userErrors;
      dispatch(login({user: {email, password}, token: token}));
      if (token) {
        await AsyncStorage.setItem('shopifyToken', token);
      } else {
        Alert.alert('Error', errors[0]?.message || 'Invalid credentials');
      }
    },
    onError: error => {
      console.log(error);
    },
  });
  const prepareApp = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const storedToken = await AsyncStorage.getItem('shopifyToken');
    setAuthToken(storedToken);
  };

  prepareApp();

  const {data, error} = useQuery(GET_CUSTOMER, {
    variables: {customerAccessToken: authToken},
  });
  if (error) {
    console.log('GET_CUSTOMER Error:', error.message);
  }

  const onChangeHandler = (text: string, field: string) => {
    setValues({...values, [field]: text});
  };

  return (
    <Container
      headerTitle="Signin"
      headerSubText="Let’s Get You Started Sign In To Continue">
      <Typography mT={32} mB={10} semiBold>
        Email
      </Typography>

      <InputField
        placeholder="Email"
        value={values.email}
        onChange={(text: string) => {
          onChangeHandler(text, 'email');
        }}
      />

      <Typography mT={32} mB={10} semiBold>
        Password
      </Typography>

      <InputField
        placeholder="Password"
        value={values.password}
        onChange={(text: string) => {
          onChangeHandler(text, 'password');
        }}
        secureTextEntry
      />

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={() => loginUser({variables: {email, password}})}
        mT={50}
      />
    </Container>
  );
};

export default Signin;
