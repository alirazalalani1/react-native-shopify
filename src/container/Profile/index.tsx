import {StyleSheet, View} from 'react-native';
import {Flex, Typography} from '../../components';
import {Metrix} from '../../config';
import AppContainer from '../../components/AppContainer';

const Profile = ({}) => {
  return (
    <View style={styles.container}>
      <Flex gap={16} style={{marginTop: Metrix.VerticalSize(50)}}>
        <View style={styles.img}></View>

        <View>
          <Typography>hihi</Typography>
          <Typography>hihi</Typography>
        </View>
      </Flex>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Metrix.HorizontalSize(24),
    flex: 1,
  },

  img: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.HorizontalSize(100),
    backgroundColor: 'lightblue',
    borderRadius: 100,
  },
});
