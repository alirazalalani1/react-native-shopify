import {
  Signin,
  Signup,
  ProductDetail,
  ShippingDetails,
  WebViewScreen,
} from '../container';

import HomeTabs from '../navigation/BottomTabs';

export const Screens = {
  Signin: 'Signin',
  Signup: 'Signup',
  AuthNavigation: 'AuthNavigation',
  MainNavigation: 'MainNavigation',
  BottomTab: 'BottomTab',
  Home: 'Home',
  Products: 'Products',
  ProductDetail: 'ProductDetail',
  ShippingDetails: 'ShippingDetails',
  WebViewScreen: 'WebViewScreen',
};

type ScreenType = {
  name: string;
  component: React.ComponentType<any>;
};

const authScreens: ScreenType[] = [
  {name: Screens.Signin, component: Signin},
  {name: Screens.Signup, component: Signup},
];

const appScreens: ScreenType[] = [
  {name: Screens.BottomTab, component: HomeTabs},
  {name: Screens.ProductDetail, component: ProductDetail},
  {name: Screens.ShippingDetails, component: ShippingDetails},
  {name: Screens.WebViewScreen, component: WebViewScreen},
];

export {authScreens, appScreens};
