import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';

import {Colors, Metrix} from '../../config';
import {BackHeader} from '../../components';
import {IRootState} from '../../store';

const WebViewScreen = () => {
  const {checkoutURL} = useSelector((state: IRootState) => state.app);
  console.log('checkoutURL', checkoutURL);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: Metrix.HorizontalSize(24)}}>
        <BackHeader />
      </View>
      <WebView
        source={{uri: checkoutURL}}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
