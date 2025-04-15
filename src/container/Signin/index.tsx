import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useDispatch} from 'react-redux';

import {CUSTOMER_LOGIN} from '../../graphQL';
import {Button, Container, InputField, Typography} from '../../components';
import {login} from '../../store/slices/auth.slice';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'waleed@nasir.com',
    password: '1234567',
  });
  const dispatch = useDispatch();

  const {email, password} = values;

  const [loginUser, {loading}] = useMutation(CUSTOMER_LOGIN, {
    onCompleted: async data => {
      const token =
        data.customerAccessTokenCreate.customerAccessToken?.accessToken;
      if (token) {
        dispatch(login({token: token}));
      }
    },
  });

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
