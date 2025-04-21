import {View, StyleSheet, FlatList} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {Colors, Metrix} from '../../config';

const HomeSkeletonCard = () => {
  return (
    <SkeletonPlaceholder borderRadius={20}>
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.textGroup}>
          <View style={styles.smallText} />
          <View style={styles.mediumText} />
          <View style={styles.smallText} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const HomeSkeleton = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.toString()}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', gap: 20}}
        renderItem={() => (
          <View style={styles.skeletonWrapper}>
            <HomeSkeletonCard />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Metrix.VerticalSize(20),
  },
  skeletonWrapper: {
    flex: 1,
    backgroundColor: Colors.grey,
    borderColor: Colors.greyV4,
    borderRadius: Metrix.HorizontalSize(20),
    height: Metrix.VerticalSize(250),
    marginBottom: Metrix.VerticalSize(20),
  },

  card: {
    paddingVertical: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(17),
  },

  image: {
    width: '100%',
    height: Metrix.VerticalSize(120),
    borderRadius: 10,
  },

  textGroup: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(12),
  },

  mediumText: {
    height: Metrix.VerticalSize(14),
    width: '100%',
    marginVertical: 4,
  },
  smallText: {
    height: Metrix.VerticalSize(12),
    width: '60%',
    marginVertical: 4,
  },
});

export {HomeSkeleton};
