import {useEffect, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import {useQuery} from '@apollo/client';

import {Button, ProductCard, Typography, ViewAll} from '../../components';
import {Colors, Metrix} from '../../config';
import {Images} from '../../config/images';
import {GET_PRODUCTS} from '../../graphQL';
import {styles} from './style';

interface Product {
  id: string;
  title: string;
  images: {src: string}[];
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {data} = useQuery(GET_PRODUCTS);

  useEffect(() => {
    setProducts(data?.products?.edges);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Images.HomeBgGirl} style={styles.headerImage} />
        <View style={styles.headerTextContainer}>
          <Typography size={26} bold mT={50}>
            Beauty and Core
          </Typography>
          <Typography color={Colors.textV2} lineHeight={16} mT={10} size={16}>
            Labore sunt culpa excepteur culpa ipsum
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
      <ViewAll text="All Products" showViewAll />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ProductCard item={item} />}
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Home;
