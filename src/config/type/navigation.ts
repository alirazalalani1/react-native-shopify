import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  HomeTabs: undefined;
  Home: {productId: string; amount: number};
};

export type NavigationStackType<T extends ParamListBase = RootStackParamList> =
  StackNavigationProp<T>;

export type ProductDetailProps = {
  route: RouteProp<AppStackParamList, 'Home'>;
  navigation: StackNavigationProp<AppStackParamList, 'Home'>;
};
