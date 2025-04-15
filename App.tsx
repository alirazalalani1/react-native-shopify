import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {Provider} from 'react-redux';

import NavigationService from './src/config/service/navigation';
import Route from './src/navigation/route';
import {Colors} from './src/config';
import client from './src/apolloClient';
import store, {persistor} from './src/store';
import {PersistGate} from 'redux-persist/es/integration/react';

const App = () => {
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated
          translucent={true}
          barStyle="dark-content"
          backgroundColor={Colors.lightgreen}
        />

        <GestureHandlerRootView style={styles.container}>
          <ApolloProvider client={client}>
            <NavigationContainer ref={NavigationService.navigationRef}>
              <Provider store={store}>
                <PersistGate persistor={persistor}>
                  <Route />
                </PersistGate>
              </Provider>
            </NavigationContainer>
          </ApolloProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: Colors.white,
  },
});
