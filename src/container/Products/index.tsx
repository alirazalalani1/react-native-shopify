import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Metrix} from '../../config';
import {useQuery} from '@apollo/client';
import {GET_COLLECTIONS} from '../../graphQL';
import {ProductCard, ViewAll} from '../../components';

const Products = () => {
  const {data} = useQuery(GET_COLLECTIONS);
  console.log('data', data?.collections?.edges[0]?.node);

  return (
    <View style={styles.container}>
      <ViewAll text="Products" />

      <View style={{height: 60}}>
        <FlatList
          data={data?.collections?.edges}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: 'lightblue', height: 60}}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: 120,
                  height: 50,
                  backgroundColor: 'pink',
                  marginRight: 10,
                }}></View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrix.HorizontalSize(24),
    backgroundColor: Colors.white,
    flex: 1,
  },
});
