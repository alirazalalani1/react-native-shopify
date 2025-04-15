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

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatlistRef = useRef<FlatList<any>>(null);
  const flatlistRef2 = useRef<FlatList>(null);

  const imagesScroll = (index: number) => {
    flatlistRef?.current?.scrollToIndex({animated: true, index: index});
  };

  const suggestedImagesScroll = (index: number) => {
    flatlistRef2?.current?.scrollToIndex({animated: true, index: index});
  };

  const scrollHandler = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  // kch to hony laga, pehli pehli bar mmuhubbat ki h, dhola, sham mein khoob hai,
  // ary rr aryu re kia hua,  tu mmeri adhuri pyas pyas, tmmhn pata tw hgoga
  return (
    <View>
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
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef2}
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainerStyles}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (index % 4 === 0) {
                  suggestedImagesScroll(index);
                }
                imagesScroll(index);
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
