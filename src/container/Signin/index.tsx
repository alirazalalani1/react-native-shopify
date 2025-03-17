import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CUSTOMER_LOGIN} from '../../graphQL';
import {useNavigation} from '@react-navigation/native';
import {Button, Container, InputField, Typography} from '../../components';

const Signin = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({email: '', password: ''});

  const {email, password} = values;

  const [loginCustomer, {loading}] = useMutation(CUSTOMER_LOGIN, {
    onCompleted: async data => {
      const token =
        data.customerAccessTokenCreate.customerAccessToken?.accessToken;
      const errors = data.customerAccessTokenCreate.userErrors;
      console.log(data);

      if (token) {
        await AsyncStorage.setItem('shopifyToken', token);
        Alert.alert('Success', 'Login Successful!');
        navigation.reset('Home');
      } else {
        console.log(errors);

        Alert.alert('Error', errors[0]?.message || 'Invalid credentials');
      }
    },
    onError: error => {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Login Error:', error);
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required!');
      return;
    }
    loginCustomer({variables: {email, password}});
  };

  const onChangeHandler = (text: string, field: string) => {
    setValues({...values, [field]: text});
  };

  return (
    <Container
      backIcon
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
        onPress={handleLogin}
        mT={50}
      />
    </Container>
  );
};

export default Signin;
