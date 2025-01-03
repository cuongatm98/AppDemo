/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {TypeStore} from '@app-schemas/server';
import {SvgXml} from 'react-native-svg';
import {iconLogoSvg} from '@app-uikits/icon-svg';
import colors from '../../../assets/styles/colors';
import styles_c from '../../../assets/styles/styles_c';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useAddFavouriteSellerMutation,
  useGetProductInSellerQuery,
} from '@app-hooks/gql-generated/server';
import {ServerClient} from '@app-clients/server/server-client';
import ListProductBase from '@app-components/ListProductBase';
import {get} from '@app-helper';
import sizes from '../../../assets/styles/sizes';
import {navigate} from '@app-navigation/navigation-services';
import StarRating from '@app-components/StarRating';
import InputAlertModal from '@app-components/InputAlertModal';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
type ViewStoreProductProps = {
  provider: string;
  data?: TypeStore;
};

const ViewStoreProduct: FC<ViewStoreProductProps> = ({provider, data}) => {
  const [text_note, setTextNote] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [addFavouriteSeller, {loading}] = useAddFavouriteSellerMutation({
    client: ServerClient,
    awaitRefetchQueries: true,
    refetchQueries: ['getSellerItems', 'getProductDetail'],
  });

  const {data: resProductInSeller} = useGetProductInSellerQuery({
    client: ServerClient,
    variables: {
      input: {
        sellerId: String(data?.id),
        page: 1,
        size: 20,
        provider: provider,
        country: 'vi',
      },
    },
  });

  const dataProductInSeller = useMemo(() => {
    return get(resProductInSeller, d => d.getProductInSeller.data, undefined);
  }, [resProductInSeller]);

  const goToDetailSeller = () => {
    navigate('SellerScreen', {provider: provider, seller_id: data?.id!});
  };

  const handleFavouriteSeller = () => {
    addFavouriteSeller({
      variables: {
        input: {
          provider: provider,
          sellerID: String(data?.id!),
          sellerLink: data?.url,
          sellerName: data?.name,
          sellerNote: text_note,
        },
      },
    })
      .then(res => {
        let data_ = res.data?.addFavouriteSeller;
        if (data_?.status) {
          setIsVisible(false);
          if (data?.favourite) {
            Toast.show({
              type: 'success',
              text1: 'Thành công',
              text2: 'Đã bỏ yêu thích!',
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Thành công',
              text2: 'Đã thêm vào yêu thích!',
            });
          }
        } else {
        }
      })
      .catch(error => {
        if (_.includes(error.message, 'HTTP error! status: 401')) {
          Toast.show({
            type: 'info',
            text1: 'Thông báo',
            text2: 'Vui lòng đăng nhập để sử dụng chức năng này!',
          });
        }
      });
  };

  const onFavourite = () => {
    if (data?.favourite) {
      handleFavouriteSeller();
    } else {
      setIsVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles_c.row_start,
          {gap: 12, paddingHorizontal: 12, paddingBottom: 12},
        ]}>
        <View style={styles.viewImage}>
          <SvgXml xml={iconLogoSvg()} style={{}} />
        </View>
        <Pressable style={{flex: 1, gap: 12}} onPress={goToDetailSeller}>
          <Text style={styles_c.font_text_16bold}>Nhà bán: {data?.name}</Text>
          <View style={[styles_c.row_start, {gap: 8}]}>
            <Text style={styles_c.font_text_14}>Đánh giá chung:</Text>
            <StarRating
              initialRating={Number(data?.informations?.compositeServiceScore)}
              isDisabled={true}
              size={16}
              color={colors.appDefault}
            />
            <Text style={styles_c.font_text_14}>
              ({data?.informations?.compositeServiceScore})
            </Text>
          </View>
          <View style={[styles_c.row_start, {gap: 12}]}>
            <TouchableOpacity
              onPress={onFavourite}
              style={[
                styles_c.row_start,
                {
                  gap: 4,
                  borderWidth: 1,
                  borderColor: data?.favourite
                    ? colors.appDefault
                    : colors.gray,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 4,
                },
              ]}>
              <MaterialIcons
                name={data?.favourite ? 'favorite' : 'favorite-border'}
                size={20}
                color={data?.favourite ? colors.redc22026 : colors.textBlack}
              />
              <Text
                style={[
                  styles_c.font_text_12,
                  {
                    color: data?.favourite
                      ? colors.appDefault
                      : colors.textBlack,
                  },
                ]}>
                {data?.favourite ? 'Đã yêu thích' : 'Yêu thích'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToDetailSeller}
              style={[
                styles_c.row_start,
                {
                  gap: 4,
                  borderWidth: 1,
                  borderColor: colors.gray,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 4,
                },
              ]}>
              <FontAwesome name="eye" size={20} />
              <Text style={styles_c.font_text_12}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
      <View style={{}}>
        <ListProductBase
          contentContainerStyle={{gap: 12, margin: 12}}
          horizontal
          item_type="colum"
          data={dataProductInSeller?.results!}
          size={sizes._screen_width / 2.4}
          renderItem={undefined}
        />
      </View>
      <InputAlertModal
        isLoading={loading}
        isVisible={isVisible}
        title="Cập nhật người bán yêu thích"
        style={{paddingHorizontal: 8}}
        label="Ghi chú thêm"
        type="default"
        multiline={true}
        inputStyle={{height: 60, paddingVertical: 12, ...styles_c.font_text_14}}
        placeholder="Ghi chú ..."
        btnTitle="Lưu lại"
        onChangeText={setTextNote}
        onClose={() => setIsVisible(false)}
        onSubmit={handleFavouriteSeller}
      />
    </View>
  );
};

export default ViewStoreProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingBottom: 0,
  },
  viewImage: {
    borderRadius: 35,
    backgroundColor: colors.background,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
