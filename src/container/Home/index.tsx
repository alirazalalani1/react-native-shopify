import {useEffect, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import {useQuery} from '@apollo/client';

import {Button, ProductCard, Typography} from '../../components';
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
    <View
      style={{paddingHorizontal: 24, backgroundColor: Colors.white, flex: 1}}>
      <View
        style={{
          height: Metrix.VerticalSize(250),
          backgroundColor: Colors.lightgreen,
          marginHorizontal: -24,
          paddingHorizontal: 24,
        }}>
        <Image
          source={Images.HomeBgGirl}
          style={{
            marginTop: Metrix.VerticalSize(24),
            width: '60%',
            height: '90%',
            position: 'absolute',
            right: Metrix.HorizontalSize(-25),
          }}
        />
        <View style={{width: '70%'}}>
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

      <Typography mT={24} bold size={18} color={Colors.primary}>
        All Products
      </Typography>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ProductCard item={item} />}
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Home;
