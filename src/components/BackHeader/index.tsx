import {StyleSheet, View} from 'react-native';

import {Colors, Metrix, SVGS} from '../../config';
import {Flex, Typography} from '../index';

const BackHeader = () => {
  return (
    <Flex style={styles.container}>
      <SVGS.BackIcon color={Colors.black} width={20} height={15} />
      <View>
        <SVGS.Cart
          width={Metrix.HorizontalSize(25)}
          height={Metrix.VerticalSize(25)}
        />
        <View
          style={{
            width: Metrix.HorizontalSize(10),
            height: Metrix.HorizontalSize(10),
            borderRadius: 100,
            backgroundColor: '#fa3e54',
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          <Typography>3</Typography>
        </View>
      </View>
    </Flex>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrix.VerticalSize(50),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    // paddingHorizontal: Metrix.HorizontalSize(24),
  },
});
