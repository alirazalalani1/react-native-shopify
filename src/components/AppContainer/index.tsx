import {ImageBackground, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Colors, Metrix} from '../../config';
import {Platform} from 'react-native';
import {Images} from '../../config/images';

export type ContainerProps = {
  pH?: number;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  backIcon?: boolean;
  contentContainerStyle?: Object;
  scrollView?: boolean;
};

const AppContainer: React.FC<ContainerProps> = ({
  headerChildren,
  children,
  pH = 24,
  contentContainerStyle,
  scrollView = true,
}) => {
  const isAndroid = Platform.OS === 'android';
  return (
    <ImageBackground
      source={Images.AppBackgroundImage}
      style={styles.imageBackground}>
      <View style={styles.headerContainer}>{headerChildren}</View>

      {scrollView ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          style={[
            styles.contentContainer,
            {paddingHorizontal: Metrix.HorizontalSize(pH)},
          ]}
          extraScrollHeight={isAndroid ? 0 : 100}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={[
            styles.contentContainer,
            {paddingHorizontal: Metrix.HorizontalSize(pH)},
          ]}>
          {children}
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },

  headerContainer: {
    // marginTop: Metrix.VerticalSize(16),
    marginBottom: Metrix.VerticalSize(24),
    marginHorizontal: Metrix.HorizontalSize(24),
  },

  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: Metrix.VerticalSize(40),
    borderTopLeftRadius: Metrix.VerticalSize(40),
  },
});

export default AppContainer;
