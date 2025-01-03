import {StyleSheet, Platform} from 'react-native';
import sizes from './sizes';
import colors from './colors';

const styles_c = StyleSheet.create({
  viewModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    maxHeight: sizes._screen_height - 120,
  },
  container: {
    flex: 1,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 8,
  },
  viewIconHeader: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.whiteOpaci,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingView: {
    position: 'absolute',
    zIndex: 99999999,
    alignSelf: 'center',
    top: sizes._screen_height * 0.2,
    padding: 20,
    backgroundColor: '#000000C3',
    borderRadius: 12,
  },
  checkBox: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingRight: 0,
    backgroundColor: '#00000000',
  },
  overlay: {
    zIndex: 99999999999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_title: {
    paddingVertical: 12,
    justifyContent: 'center',
  },
  view_height_row_bw: {
    height: sizes.height_item,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view_height_start: {
    height: sizes.height_item,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  view_height_center: {
    height: sizes.height_item,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_height_start_p16: {
    height: sizes.height_item,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  view_height_center_p16: {
    height: sizes.height_item,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  view_avatar: {
    height: sizes._70sdp,
    width: sizes._70sdp,
    borderRadius: sizes._35sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_shadow: {
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Màu của bóng đổ
        shadowOffset: {width: 0, height: 0.5}, // Độ dịch chuyển của bóng đổ
        shadowOpacity: 0.2, // Độ mờ của bóng đổ
        shadowRadius: 4, // Bán kính của bóng đổ
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizes._20sdp,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    paddingTop: Platform.OS == 'ios' ? 0 : sizes._10sdp,
    paddingBottom: sizes._10sdp,
  },
  row_start: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row_beetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_end: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  row_around: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  border_bottom: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  font_text: {
    fontSize: sizes._12sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_6: {
    fontSize: sizes._6sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_6bold: {
    fontSize: sizes._6sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_8: {
    fontSize: sizes._8sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_8bold: {
    fontSize: sizes._8sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_10: {
    fontSize: sizes._10sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_10bold: {
    fontSize: sizes._10sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_11: {
    fontSize: sizes._11sdp,
    fontFamily: 'Barlow-Medium',
    fontWeight: '500',
    color: '#2D2D2D',
  },
  font_text_12: {
    fontSize: sizes._12sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_13: {
    fontSize: sizes._13sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_12bold: {
    fontSize: sizes._12sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_14: {
    fontSize: sizes._14sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_14bold: {
    fontSize: sizes._14sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_16: {
    fontSize: sizes._16sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_16bold: {
    fontSize: sizes._16sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_18: {
    fontSize: sizes._18sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_18bold: {
    fontSize: sizes._18sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_20: {
    fontSize: sizes._20sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_20bold: {
    fontSize: sizes._20sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  font_text_22: {
    fontSize: sizes._22sdp,
    fontFamily: 'Barlow-Medium',
    color: '#2D2D2D',
  },
  font_text_22bold: {
    fontSize: sizes._22sdp,
    fontFamily: 'K2D-Bold',
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
});
export default styles_c;
