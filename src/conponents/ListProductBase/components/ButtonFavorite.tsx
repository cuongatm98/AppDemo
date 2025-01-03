/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {ServiceHeader} from '@app-services';
import {useAddFavouriteMutation} from '@app-hooks/gql-generated/server';
import {ServerClient} from '@app-clients/server/server-client';
import colors from '../../../assets/styles/colors';
import LoadingBase from '@app-components/LoadingBase';

type ButtonFavoriteProps = {
  color?: string;
  id?: string;
  image?: string;
  link?: string;
  name?: string;
  price?: number;
  promotionPrice?: number;
  provider?: string;
  sellerID?: string;
  sellerLink?: string;
  status: boolean;
};

const ButtonFavorite: FC<ButtonFavoriteProps> = ({
  id,
  image,
  link,
  name,
  price,
  promotionPrice,
  provider,
  sellerID,
  sellerLink,
  status,
  color,
}) => {
  const [addFavourite, {loading}] = useAddFavouriteMutation({
    client: ServerClient,
    awaitRefetchQueries: true,
    refetchQueries: [
      // 'searchProductList',
      // 'searchProductType',
      'getProductDetail',
    ],
  });

  const handlePress = async () => {
    try {
      const data = await ServiceHeader.getHeaderUserTokens();
      if (!data) {
        Toast.show({
          type: 'info',
          text1: 'Thông báo',
          text2: 'Người dùng chưa đăng nhập!',
        });
        return;
      }
      goToAddCart(); // Chỉ gọi onPress nếu đã đăng nhập hoặc không yêu cầu kiểm tra đăng nhập
    } catch (error) {
      console.error('Lỗi khi kiểm tra đăng nhập:', error);
    }
  };

  const goToAddCart = async () => {
    await addFavourite({
      variables: {
        input: {
          itemId: String(id) || '',
          sellerID: String(sellerID) || '',
          sellerLink: sellerLink || '',
          itemImage: image || '',
          itemLink: link || '',
          itemPrice: price || 0,
          itemPromotionPrice: promotionPrice || 0,
          itemName: name || '',
          provider: provider || '',
        },
      },
    })
      .then(res => {
        let data = res.data?.addFavourite;
        if (data?.status) {
          if (!status) {
            Toast.show({
              type: 'success',
              text1: 'Thành công',
              text2: 'Đã thêm vào danh sách yêu thích!',
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Thành công',
              text2: 'Đã loại bỏ sản phẩm yêu thích!',
            });
          }
        } else {
          Toast.show({
            type: 'info',
            text1: 'Thông báo',
            text2: 'Đã có lỗi xảy ra, vui lòng thử lại!',
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'info',
          text1: 'Thông báo',
          text2: 'Đã có lỗi xảy ra, vui lòng thử lại!',
        });
      });
  };
  return (
    <TouchableOpacity
      style={[styles.content, {backgroundColor: '#00000000'}]}
      onPress={handlePress}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '10%',
          }}>
          <LoadingBase />
        </View>
      )}
      <MaterialIcons
        name={status ? 'favorite' : 'favorite-border'}
        size={26}
        color={status ? colors.redc22026 : color ? color : colors.textBlack}
      />
    </TouchableOpacity>
  );
};

export default ButtonFavorite;

const styles = StyleSheet.create({
  content: {
    borderRadius: 4,
  },
});
