/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import styles_c from '../../../assets/styles/styles_c';
import {useOnEventCallback} from '@app-helper/hooks';
import {MainTab} from '@app-navigation/BottomTabs/navigation-bottom-tabs';
import {reset} from '@app-navigation/navigation-services';
import colors from '../../../assets/styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TooltipBase from '@app-components/TooltipBase';
import CartBase from '@app-components/HeaderApp/CartBase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type ViewRightHeaderProps = {
  onShare: () => void;
};

const ViewRightHeader: FC<ViewRightHeaderProps> = ({onShare}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const goToHomePage = useOnEventCallback(() => {
    setIsVisible(false);
    reset('BottomTabs', {routeName: MainTab.HomePage}); // Sử dụng tên của tab GoodsScreen
  });
  const goToOrderMana = useOnEventCallback(() => {
    setIsVisible(false);
    reset('BottomTabs', {routeName: MainTab.OrderManager}); // Sử dụng tên của tab GoodsScreen
  });
  const goToAccount = useOnEventCallback(() => {
    setIsVisible(false);
    reset('BottomTabs', {routeName: MainTab.Account}); // Sử dụng tên của tab GoodsScreen
  });

  return (
    <View style={{...styles_c.row_end, gap: 12}}>
      <TouchableOpacity onPress={onShare} style={styles_c.viewIconHeader}>
        <AntDesign size={24} name="sharealt" color={colors.white} />
      </TouchableOpacity>
      <CartBase />
      <TooltipBase
        isVisible={isVisible}
        backgroundColor={colors.white}
        containerStyle={[
          styles_c.box_shadow,
          {height: 160, padding: 0, paddingHorizontal: 12},
        ]}
        width={170}
        onOpen={() => setIsVisible(true)}
        onClose={() => setIsVisible(false)}
        popover={
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={goToHomePage} style={styles.viewBtn}>
              <AntDesign name="home" size={24} />
              <Text style={styles_c.font_text_12}>Trở về trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToOrderMana} style={styles.viewBtn}>
              <Octicons size={24} name="list-unordered" />
              <Text style={styles_c.font_text_12}>Đơn hàng của tôi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToAccount} style={styles.viewBtn}>
              <FontAwesome size={24} name="user-o" />
              <Text style={styles_c.font_text_12}>Cá nhân</Text>
            </TouchableOpacity>
          </View>
        }>
        <View style={styles_c.viewIconHeader}>
          <MaterialCommunityIcons
            name="dots-vertical-circle-outline"
            size={28}
            color={colors.white}
          />
        </View>
      </TooltipBase>
    </View>
  );
};

export default ViewRightHeader;

const styles = StyleSheet.create({
  viewIconHeader: {},
  viewBtn: {
    flex: 1,
    ...styles_c.row_start,
    paddingHorizontal: 12,
    gap: 12,
  },
});
