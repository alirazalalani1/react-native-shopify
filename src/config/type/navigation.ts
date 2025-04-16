import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  HomeTabs: undefined;
  Home: {productId: string; amount: number};
  ProductDetail: {productId: string; amount: number | string};
  ShippingDetails: {variantId: string};
};

export type NavigationStackType<T extends ParamListBase = RootStackParamList> =
  StackNavigationProp<T>;

export type ProductDetailProps = {
  route: RouteProp<AppStackParamList, 'ProductDetail'>;
  navigation: StackNavigationProp<AppStackParamList, 'ProductDetail'>;
};

export type DetailsTakingProps = {
  route: RouteProp<AppStackParamList, 'ShippingDetails'>;
  navigation: StackNavigationProp<AppStackParamList, 'ShippingDetails'>;
};
