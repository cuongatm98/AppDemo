import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ButtonAddCartProps = {
  color?: string;
  product_id?: string;
  provider?: string;
  size?: number;
};

const ButtonAddCart: FC<ButtonAddCartProps> = ({
  color,
  product_id,
  provider,
  size = 20,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handlePress = async () => {
    // try {
    //   const data = await ServiceHeader.getHeaderUserTokens();
    //   if (!data) {
    //     Toast.show({
    //       type: 'info',
    //       text1: 'Thông báo',
    //       text2: 'Người dùng chưa đăng nhập!',
    //     });
    //     return;
    //   }
    //   return setIsVisible(true);
    // } catch (error) {
    //   Dialog.show({
    //     type: ALERT_TYPE.WARNING,
    //     title: 'Thông báo',
    //     textBody: 'Có lỗi xảy ra, đăng nhập lại!',
    //     button: 'Đăng nhập',
    //     onPressButton() {
    //       Dialog.hide();
    //       navigate('LoginScreen');
    //     },
    //   });
    //   return;
    // }
  };

  return (
    <>
      <TouchableOpacity style={styles.content} onPress={handlePress}>
        {/* <MaterialIcons name="add-shopping-cart" size={size} color={color} /> */}
      </TouchableOpacity>
      {/* <ModalAddCart
        isVisible={isVisible}
        children={undefined}
        onClose={() => {
          setIsVisible(false);
        }}
        product_id={product_id}
        provider={provider}
      /> */}
    </>
  );
};

export default ButtonAddCart;

const styles = StyleSheet.create({
  content: {
    ...styles_c.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
    borderColor: colors.textBlack,
  },
});
