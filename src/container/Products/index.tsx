import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useQuery} from '@apollo/client';

import {ProductCard, Stepper, Typography} from '../../components';
import {Colors} from '../../config';
import {GET_COLLECTIONS, GET_SELECTED_COLLECTION} from '../../graphQL';
import {styles} from '../Home/style';
import {HomeSkeleton} from '../../components/Skeletons';

const Products = () => {
  const {data} = useQuery(GET_COLLECTIONS);
  const [selectedCategory, setSelectedCategory] = useState({
    category: data?.collections.edges[0].node.handle.replace(/-/g, '_'),
    id: data?.collections.edges[0].node.id,
  });

  useEffect(() => {
    if (data?.collections?.edges?.length > 0) {
      const firstCollection = data.collections.edges[0].node;
      setSelectedCategory({
        category: firstCollection.handle.replace(/-/g, '_'),
        id: firstCollection.id,
      });
    }
  }, [data]);

  const {
    data: collectionData,
    error,
    loading,
  } = useQuery(GET_SELECTED_COLLECTION, {
    variables: {
      id: selectedCategory.id,
      // handle: selectedCategory.category.replace(/-/g, '_'),
      skip: !selectedCategory.id,
    },
  });

  console.log('collectionData', !collectionData?.collection);
  if (error) {
    console.log('error', error);
  }

  const getCategory = (category: string, id: number) => {
    setSelectedCategory({category, id});
  };

  return (
    <View style={styles.container}>
      <Typography bold size={18} mT={32} color={Colors.primary}>
        Our Products
      </Typography>

      <Stepper steps={data?.collections?.edges} getCategory={getCategory} />

      {loading ? (
        <HomeSkeleton data={[1, 2, 3, 4, 5, 6]} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={collectionData?.collection?.products?.edges}
            keyExtractor={item => item?.node?.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <ProductCard item={item} />}
            style={styles.flatlist}
            contentContainerStyle={[
              styles.contentContainer,
              {flex: collectionData?.collection ? 0 : 1},
            ]}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography size={30} bold textAlign="center">
                  No data
                </Typography>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

export default Products;
