import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

import {Screens} from '../utils/Screens';
import {IRootState} from '../store';
import AuthNavigation from './AuthStack';
import MainNavigation from './MainStacks';
import {login} from '../store/slices/auth.slice';

const RootStack = createStackNavigator();

const Route = () => {
  const [isReady, setIsReady] = useState(false);
  const token = useSelector((state: IRootState) => state.auth.token);
  const [storedToken, setStoredToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const tokenFromStorage = await AsyncStorage.getItem('shopifyToken');
      setStoredToken(tokenFromStorage);
      console.log('funcion called');

      login({token: tokenFromStorage, user: {id: 1}});
      setIsReady(true);
    };

    loadToken();
  }, []);

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

  const isLoggedIn = token || storedToken;

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen name={Screens.BottomTab} component={MainNavigation} />
      ) : (
        <RootStack.Screen
          name={Screens.AuthNavigation}
          component={AuthNavigation}
        />
      )}
    </RootStack.Navigator>
  );
};

export default Route;
