import {Image, StyleSheet, View} from 'react-native';

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
    <View style={styles.header}>
      <Image source={Images.HomeBgGirl} style={styles.headerImage} />
      <View style={styles.headerTextContainer}>
        <Typography size={26} bold mT={50}>
          {title}
        </Typography>
        <Typography color={Colors.textV2} lineHeight={16} mT={10} size={16}>
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
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  header: {
    height: Metrix.VerticalSize(250),
    backgroundColor: Colors.lightgreen,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  headerImage: {
    marginTop: Metrix.VerticalSize(24),
    width: '60%',
    height: '90%',
    position: 'absolute',
    right: Metrix.HorizontalSize(-25),
  },
  headerTextContainer: {
    width: '70%',
  },
});
