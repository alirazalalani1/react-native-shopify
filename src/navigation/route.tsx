import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Screens} from '../utils/Screens';
import AuthNavigation from './AuthStack';
import MainNavigation from './MainStacks';

const RootStack = createStackNavigator();

const Route = () => {
  const [isReady, setIsReady] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const storedToken = await AsyncStorage.getItem('shopifyToken');
      setAuthToken(storedToken);
      setIsReady(true);
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

  return (
    <RootStack.Navigator
      initialRouteName={authToken ? Screens.BottomTab : Screens.AuthNavigation}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name={Screens.AuthNavigation}
        component={AuthNavigation}
      />
      <RootStack.Screen name={Screens.BottomTab} component={MainNavigation} />
    </RootStack.Navigator>
  );
};

export default Route;
