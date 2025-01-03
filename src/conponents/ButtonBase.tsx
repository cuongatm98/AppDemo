/* eslint-disable react-native/no-inline-styles */
import {Button, ButtonProps} from '@rneui/base';
import React, {FC, memo} from 'react';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import colors from '../assets/styles/colors';
import styles_c from '../assets/styles/styles_c';
interface ButtonBaseProps extends ButtonProps {
  checkLogin?: boolean;
  title: string;
  onPress?: () => void;
  onLogin?: () => void;
  buttonColor?: string;
  textColor?: string;
}

const ButtonBase: FC<ButtonBaseProps> = ({
  checkLogin = false,
  title,
  onPress,
  onLogin,
  buttonColor = colors.appDefault,
  textColor = 'white',
  ...props
}) => {
  const handlePress = async () => {
    try {
      if (checkLogin) {
        const data = await false;
        if (!data) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Thông báo',
            textBody: 'Người dùng chưa đăng nhập!',
            button: 'Đăng nhập',
            onPressButton() {
              Dialog.hide();
              onLogin && onLogin();
            },
          });
          return;
        }
      }
      return onPress && onPress(); // Chỉ gọi onPress nếu đã đăng nhập hoặc không yêu cầu kiểm tra đăng nhập
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Thông báo',
        textBody: 'Có lỗi xảy ra, đăng nhập lại!',
        button: 'Đăng nhập',
        onPressButton() {
          Dialog.hide();
          onLogin && onLogin();
        },
      });
      return;
    }
  };

  return (
    <Button
      title={title}
      onPress={handlePress}
      loadingProps={{
        size: 'small',
        color: props.type === 'outline' ? buttonColor : textColor,
      }}
      buttonStyle={[
        styles_c.buttonStyle,
        {
          backgroundColor:
            props.type === 'outline' ? 'transparent' : buttonColor,
          borderColor: buttonColor,
        },
        props.buttonStyle,
      ]}
      titleStyle={[styles_c.font_text_14bold, {color: textColor}]}
      {...(props as any)}
    />
  );
};

export default memo(ButtonBase);
