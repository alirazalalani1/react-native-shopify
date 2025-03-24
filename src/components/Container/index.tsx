import React, {useCallback} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Metrix, NavigationService, SVGS} from '../../config';
import {Typography} from '../index';
import {ContainerProps} from '../../config/type/appDataType';
import {Images} from '../../config/images';

const Container: React.FC<ContainerProps> = ({
  children,
  pH = 24,
  headerTitle,
  headerSubText,
  backIcon = false,
  contentContainerStyle,
  backIconHandler = false,
  handleBackIcon = () => {},
}) => {
  const handleBackPress = useCallback(() => {
    NavigationService.goBack();
  }, []);

  return (
    <ImageBackground
      source={Images.AppBackgroundImage}
      style={styles.imageBackground}>
      <View
        style={[styles.headerContainer, backIcon && styles.backIconContainer]}>
        {!backIcon ? (
          <SVGS.Logo
            width={Metrix.HorizontalSize(85)}
            height={Metrix.VerticalSize(85)}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={Metrix.ActiveOpacity}
            onPress={() => {
              backIconHandler ? handleBackIcon() : handleBackPress();
            }}
            style={styles.backButton}>
            <SVGS.BackIcon
              width={Metrix.HorizontalSize(24)}
              height={Metrix.VerticalSize(22)}
            />
          </TouchableOpacity>
        )}

        <Typography mT={40} color={Colors.black} size={23} bold>
          {headerTitle}
        </Typography>

        {headerSubText && (
          <Typography mT={2} lineHeight={24} color={Colors.black}>
            {headerSubText}
          </Typography>
        )}
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
          style={[
            styles.contentContainer,
            {paddingHorizontal: Metrix.HorizontalSize(pH)},
          ]}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    backgroundColor: Colors.lightgreen,
  },
  headerContainer: {
    marginTop: Metrix.VerticalSize(60),
    marginBottom: Metrix.VerticalSize(24),
    marginHorizontal: Metrix.HorizontalSize(24),
  },

  backIconContainer: {
    marginTop: Metrix.VerticalSize(70),
  },

  backButton: {
    marginBottom: Metrix.VerticalSize(50),
  },

  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: Metrix.VerticalSize(40),
    borderTopLeftRadius: Metrix.VerticalSize(40),
  },
});

export default Container;
