import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Colors, Metrix, NavigationService, SVGS} from '../../config';
import {Flex, Typography} from '../index';

const BackHeader = () => {
  return (
    <Flex style={styles.container}>
      <TouchableOpacity
        activeOpacity={Metrix.ActiveOpacity}
        onPress={() => {
          NavigationService.goBack();
        }}
        hitSlop={Metrix.HitSlop}>
        <SVGS.BackIcon color={Colors.black} width={20} height={15} />
      </TouchableOpacity>
      <View>
        <Icon name="shoppingcart" size={23} color={Colors.primary} />
        <View
          style={{
            width: Metrix.HorizontalSize(11),
            height: Metrix.HorizontalSize(11),
            borderRadius: 100,
            // backgroundColor: '#fa3e54',
            backgroundColor: Colors.lightpink,
            position: 'absolute',
            right: 0,
            top: 0,
            justifyContent: 'center',
          }}>
          <Typography textAlign="center" size={9} bold>
            3
          </Typography>
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
