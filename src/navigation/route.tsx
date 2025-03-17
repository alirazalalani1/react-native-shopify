import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Screens} from '../utils/Screens';
import AuthNavigation from './AuthStack';
import MainNavigation from './MainStacks';

const RootStack = createStackNavigator();

const Route = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsReady(true);
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return <Text>Loading..</Text>;
  }

  const getInitialRouteName = () => {
    // if (user?.authToken && user?.id) {
    if (false) {
      return Screens.BottomTab;
    }
    return Screens.AuthNavigation;
  };

  return (
    <RootStack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name={Screens.AuthNavigation}
        component={AuthNavigation}
      />
      <RootStack.Screen name={Screens.BottomTab} component={MainNavigation} />
    </RootStack.Navigator>
  );
};

export default Route;
