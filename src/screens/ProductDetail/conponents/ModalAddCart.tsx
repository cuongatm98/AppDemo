/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import ModalBase, {ModalBaseProps} from '@app-components/ModalBase';
import {ServerClient} from '@app-clients/server/server-client';
import {
  useAddCartMutation,
  useCalculatePriceMutation,
  useGetExchangeRateQuery,
  useGetProductDetailQuery,
  useGetUserSessionQuery,
} from '@app-hooks/gql-generated/server';
import {get} from '@app-helper';
import colors from '../../../assets/styles/colors';
import {convertPriceVND, formatAssetPrice} from '@app-helper/utils';
import ViewClassify, {TypeSkuMappings} from './ViewClassify';
import sizes from '../../../assets/styles/sizes';
import ImageCheckError from '@app-components/ImageBase/ImageCheckError';
import ImageView from 'react-native-image-viewing';
import _ from 'lodash';
import {cutString} from '@app-components/SliderCustom/SlideImage';
import AddQuantity from '@app-components/AddQuantity';
import ButtonBase from '@app-components/ButtonBase';
import Toast from 'react-native-toast-message';
import LoadingBase from '@app-components/LoadingBase';
import {navigate} from '@app-navigation/navigation-services';
import {isValidPhone} from '@app-views/AccountScreen/PersonalProfile';
import styles_c from '../../../assets/styles/styles_c';

const getNumbersFromString = (inputString: string) => {
  const numbers = inputString?.match(/\d+/g); // Tìm tất cả các số trong chuỗi
  return numbers ? numbers.map(Number)[0] : [1]; // Chuyển thành số và trả về mảng
};

interface ModalAddCartProps extends ModalBaseProps {
  product_id?: string;
  provider?: string;
  type?: 'add' | 'buy';
}

const ModalAddCart: FC<ModalAddCartProps> = ({
  product_id,
  provider,
  type = 'add',
  ...props
}) => {
  if (!props.isVisible) {
    return null; // Trả về null để không render component khi không hiển thị
  }
  const [quantity, setQuantity] = useState(1);
  const [min_quantity, setMinQuantity] = useState(1);
  const [dataMapping, setDataMapping] = useState<TypeSkuMappings>();
  const [image_zoom, setImageZoom] = useState<string | undefined>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [calculatePrice] = useCalculatePriceMutation({
    client: ServerClient,
  });
  const {data: resExchangeRate} = useGetExchangeRateQuery({
    client: ServerClient,
  });
  const {data: resUserSession} = useGetUserSessionQuery({
    client: ServerClient,
  });
  const dataUserSession = useMemo(() => {
    let data = get(resUserSession, d => d.getUserSession.data, undefined);
    return data;
  }, [resUserSession]);

  const {
    data: resProductDetail,
    loading: isLoading,
    error,
  } = useGetProductDetailQuery({
    client: ServerClient,
    variables: {
      input: {
        item_id: product_id,
        provider: provider,
      },
    },
  });

  const [addCart, {loading}] = useAddCartMutation({
    client: ServerClient,
  });

  const dataExchangeRate = useMemo(() => {
    let data = get(resExchangeRate, d => d.getExchangeRate.data);
    return _.find(data, {currency: 'CNY'});
  }, [resExchangeRate]);

  const dataProductDetail = useMemo(() => {
    return get(resProductDetail, d => d.getProductDetail, undefined);
  }, [resProductDetail]);

  const goToSuccess = async () => {
    ServerClient.resetStore();
    props.onClose && props.onClose();
    navigate('CartScreen');
  };

  const goToAddCart = async () => {
    if (!isValidPhone(dataUserSession?.phone!)) {
      return Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng cập nhật số điện thoại, để thêm tiếp tục!',
        onPress() {
          navigate('PersonalProfile');
          props.onClose && props.onClose();
        },
      });
    }
    if ((dataMapping?.quantity! ?? dataProductDetail?.data?.quantity) <= 0) {
      return Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Sản phẩm đã hết!',
      });
    }
    if (min_quantity > quantity) {
      return Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: `Số lượng phải lớn hơn hoặc bằng ${min_quantity}`,
      });
    }
    let productDetail = dataProductDetail?.data;
    let data = {
      id: String(productDetail?.id),
      name: productDetail?.name,
      price: dataMapping?.promotionPrice ?? productDetail?.promotionPrice,
      url: productDetail?.url,
      currency: productDetail?.currency,
      image: dataMapping?.imageURL ?? productDetail?.image,
      quantity: quantity,
      store: productDetail?.store as any,
      skuID: dataMapping?.skuID || undefined,
      skuName: dataMapping?.sName || undefined,
      provider: provider,
      check: type === 'add' ? false : true,
      createdAt: String(new Date().getTime()),
    };
    await addCart({
      variables: {
        input: [data],
      },
    }).then(async res => {
      let data = res.data?.addCart;
      if (data?.status) {
        if (type === 'add') {
          Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm vào giỏ hàng thành công!',
            onPress() {
              goToSuccess();
            },
          });
        } else {
          goToSuccess();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Thông báo',
          text2: 'Thêm vào giỏ hàng thất bại!',
        });
      }
    });
  };

  useEffect(() => {
    if (!dataMapping) {
      setTotalPrice(dataProductDetail?.data?.promotionPrice! * quantity);
    }
    if (!dataProductDetail?.data) {
      setTotalPrice(
        dataMapping?.promotionPrice ??
          dataProductDetail?.data?.promotionPrice ??
          0,
      );
    }
    let data = [
      {
        price:
          dataMapping?.promotionPrice ??
          dataProductDetail?.data?.promotionPrice,
        quantity: quantity,
        ranges: dataProductDetail?.data?.priceRanges,
      },
    ];
    calculatePrice({
      variables: {
        input: data as any,
      },
    }).then(async res => {
      let data_price = res.data?.calculatePrice?.data;
      setTotalPrice(Number(data_price ?? 0));
    });
  }, [calculatePrice, dataMapping, dataProductDetail?.data, quantity]);

  useEffect(() => {
    if (!dataProductDetail?.data?.priceRanges) {
      return setMinQuantity(1);
    }
    const keyMin = Object.keys(dataProductDetail?.data?.priceRanges!)[0];
    if (!keyMin) {
      return setMinQuantity(1);
    }
    setMinQuantity(Number(getNumbersFromString(keyMin!)));
  }, [dataProductDetail?.data, quantity]);

  return (
    <ModalBase {...props} isLoading={isLoading}>
      {_.includes(String(error), '401') ||
        (!dataProductDetail?.data ? (
          <View style={styles_c.loadingView}>
            <LoadingBase />
          </View>
        ) : (
          <View style={[styles_c.viewModal, styles.container]}>
            {!isLoading && !dataProductDetail?.status && (
              <View style={styles_c.loadingView}>
                <Text
                  style={[styles_c.font_text_12bold, {color: colors.white}]}>
                  Sản phẩm không tồn tại
                </Text>
              </View>
            )}
            <View
              style={[
                styles_c.row_start,
                styles_c.border_bottom,
                {paddingHorizontal: 12, gap: 12, paddingBottom: 8},
              ]}>
              <ImageCheckError
                source={{
                  uri: dataMapping?.imageURL ?? dataProductDetail?.data?.image,
                }}
                style={styles.viewImage}
              />
              <View style={{flex: 1, gap: 16}}>
                <Text style={styles_c.font_text_14} numberOfLines={4}>
                  {dataProductDetail?.data?.name}
                </Text>
                <View style={[styles_c.row_beetween, {gap: 8}]}>
                  <View style={[styles_c.row_start, {gap: 8}]}>
                    <Text
                      style={[
                        styles_c.font_text_16bold,
                        {color: colors.redc22026},
                      ]}>
                      {convertPriceVND(
                        dataMapping?.promotionPrice ??
                          dataProductDetail?.data?.promotionPrice,
                        dataExchangeRate?.rate!,
                      )}
                      đ
                    </Text>
                    <Text style={styles_c.font_text_12}>
                      ¥
                      {formatAssetPrice(
                        dataMapping?.promotionPrice ??
                          dataProductDetail?.data?.promotionPrice!,
                      )}
                    </Text>
                    {(dataMapping?.price ?? dataProductDetail?.data?.price) !==
                      (dataMapping?.promotionPrice ??
                        dataProductDetail?.data?.promotionPrice) && (
                      <Text
                        style={[
                          styles_c.font_text_12,
                          {
                            textDecorationLine: 'line-through', // Thuộc tính gạch ngang
                          },
                        ]}>
                        ¥
                        {formatAssetPrice(
                          dataMapping?.price! ?? dataProductDetail?.data?.price,
                        )}
                      </Text>
                    )}
                  </View>
                  <Text style={[styles_c.font_text_12]}>
                    {formatAssetPrice(
                      dataMapping?.quantity! ??
                        dataProductDetail?.data?.quantity,
                    )}{' '}
                    cái
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity activeOpacity={1}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 12,
                    paddingHorizontal: 4,
                    paddingTop: 8,
                  }}>
                  {dataProductDetail?.data?.priceRanges &&
                    Object.entries(dataProductDetail?.data?.priceRanges).map(
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
                              {convertPriceVND(price!, dataExchangeRate?.rate!)}
                              đ
                            </Text>
                            <Text style={styles_c.font_text_12}>¥{price}</Text>
                          </View>
                          <Text style={styles_c.font_text_12}>{range} cái</Text>
                        </View>
                      ),
                    )}
                </ScrollView>
              </TouchableOpacity>
              <ViewClassify
                data={dataProductDetail?.data?.classify}
                onChangeValue={setDataMapping}
                onZoomImage={setImageZoom}
              />
            </ScrollView>
            <View style={styles.viewBtn}>
              <View style={styles_c.row_beetween}>
                <View
                  style={[styles_c.row_start, {paddingVertical: 12, gap: 12}]}>
                  <Text style={styles_c.font_text_14}>Số lượng</Text>
                  <AddQuantity
                    minValue={min_quantity}
                    maxValue={
                      dataMapping?.quantity ?? dataProductDetail?.data?.quantity
                    }
                    height={30}
                    value={quantity}
                    onChange={setQuantity}
                  />
                </View>
                <View style={[styles_c.row_beetween, {gap: 8}]}>
                  <Text
                    style={[
                      styles_c.font_text_16bold,
                      {color: colors.appDefault},
                    ]}>
                    {convertPriceVND(totalPrice, dataExchangeRate?.rate!)}đ
                  </Text>
                  <Text style={styles_c.font_text_12}>
                    ¥{formatAssetPrice(totalPrice!)}
                  </Text>
                </View>
              </View>
              <ButtonBase
                loading={loading}
                checkLogin={true}
                title={type === 'add' ? 'Thêm vào giỏ hàng' : 'Mua ngay'}
                onPress={goToAddCart}
                buttonColor={colors.appDefault}
                textColor={colors.textWhite}
                onLogin={() => {}}
              />
            </View>
            <ImageView
              images={[
                {
                  uri: cutString(image_zoom || ''), // Thay thế trường 'src' bằng 'uri'
                },
              ]}
              imageIndex={0}
              visible={image_zoom ? true : false}
              doubleTapToZoomEnabled={true}
              onRequestClose={() => setImageZoom(undefined)}
            />
            <SafeAreaView style={{backgroundColor: colors.white}} />
          </View>
        ))}
    </ModalBase>
  );
};

export default memo(ModalAddCart);

const styles = StyleSheet.create({
  container: {
    maxHeight: sizes._screen_height - 140,
  },
  viewImage: {
    height: 120,
    width: 120,
    borderRadius: 8,
  },
  viewBtn: {
    paddingHorizontal: 12,
    ...styles_c.box_shadow,
  },
});
