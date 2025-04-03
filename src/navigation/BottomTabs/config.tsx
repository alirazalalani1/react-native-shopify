import {Metrix} from '../../config';
import {Colors} from '../../config/color';
import {TAB_SVGS} from '../../config/images';
import {Home, Products} from '../../container';

type BottomTabConfigType = {
  [key: string]: {
    screenName: string;
    component: any;
    icon: (isFocused: boolean) => JSX.Element;
    iconGray: string;
    headerShown: boolean;
    label: string;
  };
};

export const BottomTabConfig = () => {
  const bottomTabConfig: BottomTabConfigType = {
    Home: {
      screenName: 'Home',
      component: Home,
      icon: (isFocused: boolean) => {
        return (
          <TAB_SVGS.HomeTab color={isFocused ? Colors.green : Colors.black} />
        );
      },
      iconGray: '1',
      headerShown: false,
      label: 'Home',
    },
    Products: {
      screenName: 'Products',
      component: Products,
      icon: (isFocused: boolean) => {
        return (
          <TAB_SVGS.ProfileTab
            color={isFocused ? Colors.green : Colors.textV2}
          />
        );
      },
      iconGray: '1',
      headerShown: false,
      label: 'Rewards',
    },
    Wishlist: {
      screenName: 'Wishlist',
      component: Products,
      icon: (isFocused: boolean) => {
        return (
          <TAB_SVGS.Wishlist
            width={Metrix.HorizontalSize(25)}
            height={Metrix.VerticalSize(25)}
            color={isFocused ? Colors.green : Colors.textV2}
          />
        );
      },
      iconGray: '1',
      headerShown: false,
      label: 'Rewards',
    },
    Profile: {
      screenName: 'Profile',
      component: Products,
      icon: (isFocused: boolean) => {
        return (
          <TAB_SVGS.ProfileTab
            color={isFocused ? Colors.green : Colors.textV2}
          />
        );
      },
      iconGray: '1',
      headerShown: false,
      label: 'Rewards',
    },
  };
  return bottomTabConfig;
};
