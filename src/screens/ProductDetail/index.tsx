/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Animated,
  LayoutChangeEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';

import _ from 'lodash';
import {Button} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewClassify, {TypeSkuMappings} from './conponents/ViewClassify';
import ViewBtnAddCart from './conponents/ViewBtnAddCart';
import ViewStoreProduct from './conponents/ViewStoreProduct';
import ViewDetaiProduct from './conponents/ViewDetaiProduct';
import SimilarProducts from './conponents/SimilarProducts';
import ModalAddCart from './conponents/ModalAddCart';
import ViewRightHeader from './conponents/ViewRightHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/styles/colors';
import sizes from '../../assets/styles/sizes';
import styles_c from '../../assets/styles/styles_c';
import LoadingBase from '../../conponents/LoadingBase';
import HeaderApp from '../../conponents/HeaderApp/HeaderApp';
import SlideImage, {cutString} from '../../conponents/SliderCustom/SlideImage';
import {
  convertPriceVND,
  formatAssetPrice,
} from '../../conponents/ListProductBase/components/ItemProductBase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDetailProducts} from '../../api/homeApi';

export type ProductDetailProps = {
  product_id?: string;
  provider?: string;
};

const ProductDetail: FC<any> = ({route, navigation}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  const [buttonAddCartYPosition, setButtonAddCartYPosition] =
    useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [button, setButton] = useState<number>(0);
  const [typeButton, setTypeButton] = useState<'add' | 'buy'>('add');
  const [image_zoom, setImageZoom] = useState<string | undefined>();
  const {product_id, provider} = route.params;
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100], // Điều chỉnh inputRange theo mong muốn
    outputRange: ['#00000000', colors.appDefault],
    extrapolate: 'clamp',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataProductDetail, setDataProductDetail] = useState<any>();
  const [dataMapping, setDataMapping] = useState<TypeSkuMappings>();

  const dataExchangeRate = {
    currency: 'CNY',
    name: 'Nhân dân tệ (CNY)',
    rate: 3660,
  };

  const handleScroll = useCallback(
    (e: any) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      let buttonY = buttonAddCartYPosition + button;
      if (offsetY + sizes._screen_height <= buttonY && !showFloatingButton) {
        setShowFloatingButton(true);
      } else if (
        offsetY + sizes._screen_height > buttonY &&
        showFloatingButton &&
        offsetY + sizes._screen_height < buttonY + sizes._screen_height
      ) {
        setShowFloatingButton(false);
      } else if (
        !showFloatingButton &&
        offsetY + sizes._screen_height >= buttonY + sizes._screen_height
      ) {
        setShowFloatingButton(true);
      }
    },
    [button, buttonAddCartYPosition, showFloatingButton],
  );

  const handleButtonAddCartLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setButtonAddCartYPosition(layout.y);
  };
  const handleViewBody = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setButton(layout.y);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: dataProductDetail?.data.url!,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type of: ', result.activityType);
        } else {
          Alert.alert('Chia sẻ thành công!');
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert('Chia sẻ đã bị hủy.');
      }
    } catch (error: any) {
      Alert.alert('Lỗi chia sẻ:', error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDetailProduct(product_id, provider);
  }, [product_id, provider]);

  const fetchDetailProduct = async (id: string, pvoid: string) => {
    try {
      setIsLoading(true);
      const data = await getDetailProducts(id, pvoid);
      setDataProductDetail(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles_c.container]}>
      {(refreshing || isLoading) && (
        <View style={styles_c.loadingView}>
          <LoadingBase />
        </View>
      )}
      <HeaderApp
        onGoBack={() => navigation.goBack()}
        centerComponent={{
          text: '',
          style: {...styles_c.font_text_18bold, color: colors.background},
        }}
        headerBackgroundColor={headerBackgroundColor}
        // rightComponent={<ViewRightHeader onShare={onShare} />}
      />
      <View style={styles.content}>
        {!isLoading && !dataProductDetail?.status && (
          <View style={styles_c.loadingView}>
            <Text style={[styles_c.font_text_12bold, {color: colors.white}]}>
              Sản phẩm không tồn tại
            </Text>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: false,
              listener: handleScroll, // Giữ logic cũ cho nút `Floating Button`
            },
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          scrollEventThrottle={16}
          style={{}}>
          <View style={{backgroundColor: colors.background, gap: 8}}>
            <View style={styles.viewBody}>
              <SlideImage data={dataProductDetail?.data?.thumbnails} />
              <View style={{paddingHorizontal: 12, gap: 12}}>
                <Text style={styles_c.font_text_16} numberOfLines={2}>
                  {dataProductDetail?.data?.name}
                </Text>
                <Button
                  onPress={() => {}}
                  ViewComponent={LinearGradient} // Don't forget this!
                  linearGradientProps={{
                    colors: colors.colorsGradient,
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 0.5},
                  }}
                  containerStyle={{}}>
                  <View style={styles_c.row_beetween}>
                    <Text
                      style={{
                        flex: 1,
                        ...styles_c.font_text_12,
                        color: colors.white,
                      }}>
                      Xem sản phẩm nhà bán:{' '}
                      {dataProductDetail?.data?.store?.name}{' '}
                    </Text>
                    <Feather
                      name="trending-up"
                      size={24}
                      color={colors.white}
                    />
                  </View>
                </Button>
                <View style={[styles_c.row_start, {gap: 8}]}>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={colors.appDefault}
                  />
                  <Text
                    style={[styles_c.font_text_12, {color: colors.appDefault}]}>
                    Mỗi loại mua tối thiểu {dataProductDetail?.data?.minOrder}{' '}
                    sản phẩm
                  </Text>
                </View>
                <View style={styles_c.row_beetween}>
                  <View style={[styles_c.row_start, {gap: 12}]}>
                    <Text
                      style={[
                        styles_c.font_text_16bold,
                        {color: colors.redc22026},
                      ]}>
                      {convertPriceVND(
                        dataMapping?.promotionPrice! ??
                          dataProductDetail?.data?.promotionPrice,
                        dataExchangeRate?.rate!,
                      )}
                      đ
                    </Text>
                    <Text style={styles_c.font_text_12}>
                      ¥
                      {formatAssetPrice(
                        dataMapping?.promotionPrice! ??
                          dataProductDetail?.data?.promotionPrice,
                      )}
                    </Text>
                    {dataMapping?.price !== dataMapping?.promotionPrice && (
                      <Text
                        style={[
                          styles_c.font_text_12,
                          {
                            textDecorationLine: 'line-through', // Thuộc tính gạch ngang
                          },
                        ]}>
                        ¥{formatAssetPrice(dataMapping?.price!)}
                      </Text>
                    )}
                  </View>
                  <View style={[styles_c.row_end, {gap: 8}]}>
                    <AntDesign
                      name="sharealt"
                      size={22}
                      color={colors.black}
                      onPress={onShare}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={styles.viewBody}
              onLayout={handleViewBody} // Xác định vị trí ButtonAddCart
            >
              <ViewClassify
                data={dataProductDetail?.data?.classify}
                onChangeValue={setDataMapping}
                onZoomImage={setImageZoom}
              />
              <View>
                {dataProductDetail?.data?.priceRanges && (
                  <View style={{paddingTop: 8}}>
                    <View
                      style={[
                        styles_c.view_title,
                        {
                          paddingHorizontal: 12,
                          backgroundColor: colors.appDefaultOpaci,
                        },
                      ]}>
                      <Text style={styles_c.font_text_14bold}>Giá ưu đãi</Text>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        gap: 12,
                        paddingHorizontal: 4,
                        paddingTop: 8,
                      }}>
                      {Object.entries(dataProductDetail?.data?.priceRanges).map(
                        ([range, price], index) => (
                          <View
                            key={index}
                            style={{
                              alignItems: 'center',
                              gap: 8,
                              margin: 8,
                              padding: 8,
                              borderRadius: 6,
                              ...styles_c.box_shadow,
                            }}>
                            <View style={[styles_c.row_start, {gap: 8}]}>
                              <Text
                                style={[
                                  styles_c.font_text_14bold,
                                  {color: colors.appDefault},
                                ]}>
                                {convertPriceVND(
                                  price,
                                  dataExchangeRate?.rate!,
                                )}
                                đ
                              </Text>
                              <Text style={styles_c.font_text_12}>
                                ¥{price}
                              </Text>
                            </View>
                            <Text style={styles_c.font_text_12}>
                              {range} cái
                            </Text>
                          </View>
                        ),
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>
              <View
                style={{padding: 12}}
                onLayout={handleButtonAddCartLayout} // Xác định vị trí ButtonAddCart
              >
                <ViewBtnAddCart
                  setIsCheck={setIsCheck}
                  onAddCart={() => {
                    setTypeButton('add');
                    setIsVisible(true);
                  }}
                  onBuyProduct={() => {
                    setTypeButton('buy');
                    setIsVisible(true);
                  }}
                />
              </View>
            </View>
            {/* <View style={styles.viewBody}>
              <ViewStoreProduct
                data={dataProductDetail?.data?.store!}
                provider={provider!}
              />
            </View> */}
            <View style={[styles.viewBody]}>
              <ViewDetaiProduct
                attributes={dataProductDetail?.data?.attributes}
                productInfos={dataProductDetail?.data?.productInfos!}
                dataDescription={dataProductDetail?.data?.description}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <View style={{}}>
        {showFloatingButton && (
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 12,
              paddingTop: 12,
            }}>
            <SafeAreaView>
              <ViewBtnAddCart
                setIsCheck={setIsCheck}
                onAddCart={() => {
                  setTypeButton('add');
                  setIsVisible(true);
                }}
                onBuyProduct={() => {
                  setTypeButton('buy');
                  setIsVisible(true);
                }}
              />
            </SafeAreaView>
          </View>
        )}
      </View> */}
      {/* {isCheck && (
        <ModalCheckLogIn
          onClose={() => {
            setIsCheck(false);
          }}
        />
      )} */}
      {/* <ModalAddCart
        type={typeButton}
        isVisible={isVisible}
        children={undefined}
        onClose={() => {
          setIsVisible(false);
        }}
        product_id={product_id}
        provider={provider}
      /> */}
      {/* <ImageView
        images={[
          {
            uri: cutString(image_zoom || ''), // Thay thế trường 'src' bằng 'uri'
          },
        ]}
        imageIndex={0}
        visible={image_zoom ? true : false}
        doubleTapToZoomEnabled={true}
        onRequestClose={() => setImageZoom(undefined)}
      /> */}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  viewBody: {
    backgroundColor: colors.white,
    paddingBottom: 12,
  },
});
