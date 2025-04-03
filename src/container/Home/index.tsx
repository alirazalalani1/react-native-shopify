import {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useQuery} from '@apollo/client';

import {Banner, ProductCard, ViewAll} from '../../components';
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
    <ScrollView style={styles.container}>
      <Banner
        title="Beauty and Core"
        subtitle=" Labore sunt culpa excepteur culpa ipsum"
        buttonText="Shop Now"
        onPress={() => {}}
      />
      <ViewAll text="Trending Products" showViewAll />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ProductCard item={item} />}
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainer}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />

      <Banner
        title="Get Your 50% Off!"
        subtitle=" Labore sunt culpa excepteur culpa ipsum"
        buttonText="Shop Now"
        onPress={() => {}}
      />

      <ViewAll text="New Arrivals" showViewAll />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ProductCard item={item} />}
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Home;
