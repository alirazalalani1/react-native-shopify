import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import {Images} from '../../config/images';
import {Typography, Button} from '../index';
import {Colors, Metrix} from '../../config';

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
}
const Banner = ({title, subtitle, buttonText, onPress}: BannerProps) => {
  return (
    <ImageBackground source={Images.AppBackgroundImage} style={styles.header}>
      <Image source={Images.HomeBgGirl} style={styles.imgStyle} />

      <View style={styles.headerTextContainer}>
        <Typography size={36} bold mT={75}>
          {title}
        </Typography>

        <Typography color={Colors.textV2} lineHeight={18} mT={10} size={20}>
          {subtitle}
        </Typography>
        <Button
          title="Shop Now"
          width={120}
          mT={20}
          height={40}
          textSize={14}
        />
      </View>
    </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({
  header: {
    height: Metrix.VerticalSize(350),
    backgroundColor: Colors.lightgreen,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    resizeMode: 'repeat',
  },
  imgStyle: {
    width: Metrix.HorizontalSize(210),
    height: Metrix.VerticalSize(310),
    resizeMode: 'contain',
    position: 'absolute',
    right: Metrix.HorizontalSize(-25),
    bottom: 0,
  },
  headerTextContainer: {
    width: '75%',
  },
});
