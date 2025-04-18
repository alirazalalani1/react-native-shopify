import {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';

import {Banner, ProductCard, ViewAll} from '../../components';
import {GET_CUSTOMER, GET_PRODUCTS} from '../../graphQL';
import {styles} from './style';
import {setUser} from '../../store/slices/auth.slice.ts';
import {IRootState} from '../../store';
import {ProductItem} from '../../config/type/appDataType';

const Home = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const {token} = useSelector((state: IRootState) => state.auth);
  const {data} = useQuery(GET_PRODUCTS);
  const dispatch = useDispatch();

  const {data: customerData, error} = useQuery(GET_CUSTOMER, {
    variables: {customerAccessToken: token},
    skip: !token,
  });

  useEffect(() => {
    // dispatch(setUser(customerData));
    console.log('customerData', customerData);
    if (error) {
      console.log('error', error);
    }
  }, [customerData]);

  useEffect(() => {
    setProducts(data?.products?.edges);
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <Banner
        title="Beauty and Core"
        subtitle="Labore sunt culpa excepteur culpa ipsum"
        buttonText="Shop Now"
        onPress={() => {}}
      />
      <ViewAll mB={10} text="Trending Products" showViewAll />

      <FlatList
        data={products}
        keyExtractor={item => item?.node?.id}
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
        subtitle="Labore, sunt culpa excepteur culpa ipsum"
        buttonText="Shop Now"
        onPress={() => {}}
      />

      <ViewAll text="New Arrivals" showViewAll />

      <FlatList
        data={products}
        keyExtractor={item => item?.node?.id}
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
