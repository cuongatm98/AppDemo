import {StyleSheet, View} from 'react-native';
import React, {FC, memo} from 'react';
import styles_c from '../../../assets/styles/styles_c';
import colors from '../../../assets/styles/colors';
import ButtonBase from '../../../conponents/ButtonBase';

type ViewBtnAddCartProps = {
  setIsCheck?: (val: boolean) => void;
  onAddCart: () => void;
  onBuyProduct: () => void;
};

const ViewBtnAddCart: FC<ViewBtnAddCartProps> = ({
  setIsCheck,
  onAddCart,
  onBuyProduct,
}) => {
  return (
    <View style={styles.viewBtn}>
      <ButtonBase
        checkLogin={true}
        title="Thêm vào giỏ hàng"
        onPress={onAddCart}
        type="outline"
        buttonColor={colors.appDefault}
        textColor={colors.appDefault}
        containerStyle={styles_c.container}
        onLogin={() => setIsCheck && setIsCheck(true)}
      />
      <ButtonBase
        checkLogin={true}
        title="Mua ngay"
        onPress={onBuyProduct}
        buttonColor={colors.appDefault}
        textColor={colors.textWhite}
        containerStyle={styles_c.container}
        onLogin={() => setIsCheck && setIsCheck(true)}
      />
    </View>
  );
};

export default memo(ViewBtnAddCart);

const styles = StyleSheet.create({
  viewBtn: {
    ...styles_c.row_beetween,
    gap: 16,
    paddingVertical: 4,
  },
});
