/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import sizes from '../../../assets/styles/sizes';
import styles_c from '../../../assets/styles/styles_c';
import FastImage from 'react-native-fast-image';
import numeral from 'numeral';
import colors from '../../../assets/styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const formatAssetPrice = (
  price: number | string,
  decimals: number = 4,
): string => {
  if (price == null || price == undefined) {
    return '0';
  }
  if (typeof price === 'number') {
    return numeral(price.toFixed(decimals))
      .format('0,0[.]0[0000]')
      .toString()
      .toUpperCase();
  } else {
    let price_ = parseFloat(price);
    return numeral(price_.toFixed(decimals))
      .format('0,0[.]0[0000]')
      .toString()
      .toUpperCase();
  }
};

export const convertPriceVND = (price?: number | string, rate?: number) => {
  if (
    price === null ||
    price === undefined ||
    rate === null ||
    rate === undefined
  ) {
    return '0';
  }
  if (typeof price === 'number') {
    return numeral(Math.ceil(price * rate))
      .format('0,0[.]0[0000]')
      .toString()
      .toUpperCase();
  } else {
    let price_ = parseFloat(price);
    return numeral(Math.ceil(price_ * rate))
      .format('0,0[.]0[0000]')
      .toString()
      .toUpperCase();
  }
};
type ItemProductBaseProps = {
  showFavourite?: boolean;
  name: string;
  price: number;
  totalBuy?: string;
  image?: string;
  item_type?: 'row' | 'colum';
  size?: number;
  rePurchaseRate?: string;
  monthSold?: number;
  provider?: string;
  product_id?: string;
  promotionPrice: number;
  link?: string;
  onChangeItem?: () => void;
};

const ItemProductBase: FC<ItemProductBaseProps> = ({
  item_type,
  name,
  totalBuy,
  image,
  size = sizes._screen_width / 2.2,
  rePurchaseRate,
  monthSold,
  provider,
  // product_id,
  promotionPrice,
  onChangeItem,
}) => {
  const dataExchangeRate = {
    currency: 'CNY',
    name: 'Nhân dân tệ (CNY)',
    rate: 3660,
  };
  const priceVND = useMemo(() => {
    let result = promotionPrice * dataExchangeRate?.rate!;
    return result.toFixed(0);
  }, [dataExchangeRate?.rate, promotionPrice]);

  if (item_type === 'row') {
    return (
      <TouchableOpacity
        onPress={onChangeItem}
        style={[
          styles_c.row_start,
          {
            gap: 8,
            width: sizes._screen_width * 0.6,
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 8,
          },
        ]}>
        <FastImage
          source={{uri: image as string}}
          style={[styles.image, {width: size / 2.5, height: size / 2.5}]}
        />
        <View style={{flex: 1, gap: 8}}>
          <Text numberOfLines={2} style={styles_c.font_text_12bold}>
            {name}
          </Text>
          <View style={styles_c.row_beetween}>
            <Text
              style={[styles_c.font_text_12bold, {color: colors.colorff5c00}]}>
              {formatAssetPrice(priceVND)}đ
            </Text>
            <Text style={[styles_c.font_text_10, {color: colors.black}]}>
              ¥{formatAssetPrice(promotionPrice)}
            </Text>
          </View>
          <Text style={styles_c.font_text_10}>{totalBuy} sản phẩm đã bán</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onChangeItem}
      style={[
        styles_c.container,
        styles_c.box_shadow,
        {width: size, borderRadius: 8},
      ]}>
      <View>
        <FastImage
          source={{uri: image as string}}
          style={[styles.imageC, {width: '100%', height: size}]}
        />
        <>
          {provider === 'alibaba' ? (
            <View style={[styles.viewIcon, {paddingVertical: 6}]}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '900',
                  color: colors.redff424f,
                }}>
                1688
              </Text>
            </View>
          ) : (
            <View style={styles.viewIcon}>
              <FastImage
                source={{
                  uri: 'https://pandamall.vn/static/icons/icon_taobao.png',
                }}
                style={{width: 20, height: 20}}
              />
            </View>
          )}
        </>

        {/* {showFavourite && (
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              padding: 4,
              backgroundColor: colors.blackOpaci,
              borderRadius: 8,
            }}>
            <ButtonFavorite
              color={colors.textWhite}
              status={status}
              name={name}
              price={price}
              id={product_id}
              provider={provider}
              link={link}
              promotionPrice={promotionPrice}
              image={image}
            />
          </View>
        )} */}
      </View>
      <View style={{flex: 1, gap: 4, padding: 8}}>
        <Text numberOfLines={2} style={styles_c.font_text_13}>
          {name}
        </Text>
        {provider === 'alibaba' && (
          <View style={[styles_c.row_beetween, {gap: 6, paddingTop: 6}]}>
            {rePurchaseRate ? (
              <LinearGradient
                style={[
                  styles_c.row_start,
                  {flex: 1, padding: 4, borderRadius: 6, gap: 4},
                ]}
                colors={['#FBD6B2FF', '#FEE4ACFF', '#FFFFFF']} // Định nghĩa các màu gradient
                start={{x: 0, y: 0}} // Điểm bắt đầu (bên trái)
                end={{x: 1, y: 0}} // Điểm kết thúc (bên phải)
              >
                <MaterialCommunityIcons
                  name="account-reactivate-outline"
                  color={colors.colorff5c00}
                />
                <Text
                  style={[styles_c.font_text_10, {color: colors.colorff5c00}]}
                  numberOfLines={1}>
                  {rePurchaseRate} mua lại
                </Text>
              </LinearGradient>
            ) : null}
            {monthSold! >= 0 ? (
              <Text style={[styles_c.font_text_10, {color: colors.textBlack}]}>
                đã bán {formatAssetPrice(monthSold || 0)}
              </Text>
            ) : null}
          </View>
        )}
        <View style={[styles_c.row_beetween, {alignItems: 'flex-end'}]}>
          <View style={{gap: 6}}>
            <Text
              style={[styles_c.font_text_14bold, {color: colors.colorff5c00}]}>
              {formatAssetPrice(priceVND)}đ
            </Text>
            <Text style={[styles_c.font_text_12, {color: colors.textBlack}]}>
              ¥{formatAssetPrice(promotionPrice)}
            </Text>
          </View>
          {/* <ButtonAddCart
            product_id={product_id}
            provider={provider}
            color={colors.textBlack}
            size={size * 0.1}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemProductBase;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  image: {
    borderRadius: 8,
  },
  imageC: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  viewIcon: {
    position: 'absolute',
    left: 0,
    bottom: -1,
    backgroundColor: colors.white,
    padding: 2,
    borderTopRightRadius: 12,
    width: 50,
    alignItems: 'center',
  },
});
