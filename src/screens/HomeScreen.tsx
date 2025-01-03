/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles_c from '../assets/styles/styles_c';
import colors from '../assets/styles/colors';
import {
  DataProductsHome,
  getBannersHome,
  getProducts,
  TypeDataBannersHome,
  TypeProductsHome,
} from '../api/homeApi';
import LoadingBase from '../conponents/LoadingBase';
import CardCaroulsel from '../conponents/SliderCustom/CardCaroulsel';
import ListProductBase from '../conponents/ListProductBase';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [data_banners, setDataBanners] = useState<TypeDataBannersHome>();
  const [data_product, setDataProduct] = useState<TypeProductsHome>();
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      setLoading(true);
      const dataBannersHome = await getBannersHome();
      const data = await getProducts();
      setDataBanners(dataBannersHome);
      setDataProduct(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeItem = (item: DataProductsHome) => {
    navigation.navigate('ProductDetail', {
      product_id: item?.id,
      provider: item.provider,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {loading && (
          <View style={styles_c.loadingView}>
            <LoadingBase />
          </View>
        )}

        <CardCaroulsel data={data_banners?.banners || []} />
        <ListProductBase
          isLoading={loading}
          item_type="colum"
          numColumns={2}
          data={data_product?.results || []}
          ListHeaderComponent={<></>}
          contentContainerStyle={{
            gap: 12,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingBottom: 12,
          }}
          columnWrapperStyle={{gap: 12, justifyContent: 'flex-start'}}
          scrollEnabled={false}
          renderItem={undefined}
          onChangeItem={onChangeItem}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    ...styles_c.font_text_18bold,
    color: colors.textWhite,
  },
  content: {
    flex: 1,
  },
});
