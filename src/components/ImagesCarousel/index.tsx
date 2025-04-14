import {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {Metrix} from '../../config';
import {styles} from './style';

const ImagesCarousel = ({data}: any) => {
  const {width} = useWindowDimensions();
  const flatlistRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndexx = (index: number) => {
    flatlistRef?.current?.scrollToIndex({animated: true, index: index});
    setCurrentIndex(index);
  };

  const scrollHandler = (e: any) => {
    console.log(e);

    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={{backgroundColor: 'pink'}}>
      <FlatList
        ref={flatlistRef}
        data={data || []}
        horizontal
        pagingEnabled
        style={{marginHorizontal: Metrix.HorizontalSize(-24)}}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        renderItem={({item}) => {
          return (
            <Image
              source={{uri: item.src}}
              style={[styles.img, {width: width}]}
            />
          );
        }}
      />

      <FlatList
        data={data}
        horizontal
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainerStyles}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                scrollToIndexx(index);
              }}>
              <Image source={{uri: item.src}} style={styles.smallImg} />
              {currentIndex !== index && <View style={styles.overlay}></View>}
            </TouchableOpacity>
          );
        }}
      />

      {/* <View style={styles.imagesContainer}>
        {data?.map((obj: ImageItem, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                scrollToIndexx(i);
              }}>
              <Image source={{uri: obj.src}} style={styles.smallImg} />
              {currentIndex !== i && <View style={styles.overlay}></View>}
            </TouchableOpacity>
          );
        })}
      </View> */}
    </View>
  );
};

export default ImagesCarousel;
