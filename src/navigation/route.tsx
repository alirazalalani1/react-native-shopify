import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Screens} from '../utils/Screens';
import AuthNavigation from './AuthStack';
import MainNavigation from './MainStacks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();

const Route = () => {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>('');

  const getAuthToken = async () => {
    const authToken = await AsyncStorage.getItem('shopifyToken');
    return authToken;
  };

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsReady(true);
      const token = await getAuthToken();
      setToken(token);
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return <Text>Loading..</Text>;
  }

  const getInitialRouteName = () => {
    if (token) {
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
