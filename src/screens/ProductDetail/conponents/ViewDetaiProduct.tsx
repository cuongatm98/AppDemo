/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import styles_c from '../../../assets/styles/styles_c';
import _ from 'lodash';
import {Divider} from '@rneui/themed';
import RenderHTMLBase from '../../../conponents/RenderHTMLBase';
import sizes from '../../../assets/styles/sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../assets/styles/colors';

type ViewDetaiProductProps = {
  attributes?: any;
  productInfos?: any[];
  dataDescription?: string;
};

interface ContentSize {
  width: number;
  height: number;
}

const ViewDetaiProduct: FC<ViewDetaiProductProps> = ({
  attributes,
  productInfos,
  dataDescription,
}) => {
  const [is_check, setIsCheck] = useState<boolean>(false);
  const [translate_language, setTranslateLanguage] = useState<boolean>(false);
  const [contentSize, setContentSize] = useState<ContentSize>({
    width: 0,
    height: 0,
  });

  const onContentLayout = (event: {
    nativeEvent: {layout: {width?: number; height?: number}};
  }) => {
    const {width = 0, height = 0} = event.nativeEvent.layout;
    if (!translate_language) {
      setContentSize({width, height});
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View key={index}>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>{item.key}</Text>
        </View>
        {item.values?.map(
          (item_: any, index_: React.Key | null | undefined) => {
            return (
              <View style={styles.viewItem_} key={index_}>
                <Text style={[styles_c.font_text_12, {textAlign: 'center'}]}>
                  {item_ ?? '...'}
                </Text>
              </View>
            );
          },
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {productInfos && productInfos.length > 0 && (
        <View>
          <View style={styles_c.view_title}>
            <Text style={styles_c.font_text_16bold}>
              Kích cỡ và khối lượng sản phẩm
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{maxHeight: sizes._screen_height / 1.8}}>
            <View style={styles.content}>
              <FlatList
                horizontal
                data={productInfos}
                renderItem={renderItem}
                contentContainerStyle={{
                  ...styles_c.border,
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      )}
      {dataDescription && (
        <View style={styles.content}>
          <View style={styles_c.view_title}>
            <Text style={styles_c.font_text_16bold}>Mô tả sản phẩm</Text>
          </View>
          <View
            style={{
              ...styles.container,
              maxHeight: is_check ? contentSize.height + 50 : sizes._200sdp,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View onLayout={onContentLayout}>
                {dataDescription ? (
                  <RenderHTMLBase html={dataDescription} />
                ) : (
                  <View style={{alignItems: 'center', flex: 1}}>
                    <Text style={{textAlign: 'center'}}>Không có nội dung</Text>
                  </View>
                )}
              </View>
            </ScrollView>
            {dataDescription && contentSize.height > 180 && (
              <View style={styles.viewBtn}>
                <TouchableOpacity onPress={() => setIsCheck(!is_check)}>
                  <View
                    style={{
                      height: '100%',
                      ...styles_c.row_center,
                      gap: 6,
                    }}>
                    <Text
                      style={{...styles_c.font_text_12bold, color: '#c22026'}}>
                      {is_check ? 'Ẩn bớt' : 'Xem thêm'}
                    </Text>
                    <AntDesign
                      name={is_check ? 'up' : 'down'}
                      color="#c22026"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {attributes && (
        <View style={styles.content}>
          <View style={styles_c.view_title}>
            <Text style={styles_c.font_text_16bold}>Thông tin sản phẩm</Text>
          </View>
          <View style={[styles_c.border, {borderBottomWidth: 0}]}>
            {Object.values(attributes).map((item: any, index: number) => {
              return (
                <View style={styles.viewItem} key={index}>
                  <View style={[styles_c.row_start, {padding: 12, gap: 8}]}>
                    <Text style={[styles_c.font_text_14, {flex: 1}]}>
                      {item?.name}
                    </Text>
                    <Divider orientation="vertical" />
                    <Text
                      style={[styles_c.font_text_14, {flex: 1.5}]}
                      numberOfLines={2}>
                      {_.join(item?.value, ', ')}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default ViewDetaiProduct;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  viewItem: {
    ...styles_c.border_bottom,
  },
  content: {
    ...styles_c.border_bottom,
    paddingBottom: 16,
  },
  viewBtn: {
    paddingHorizontal: 12,
    position: 'absolute',
    zIndex: 99999,
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: '#FFFFFFBA',
    width: '100%',
    height: sizes.height_item,
  },
  viewTitle: {
    width: sizes._screen_width * 0.23,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.height_item,
    backgroundColor: colors.background,
    ...styles_c.border_bottom,
    borderRightWidth: 1,
  },
  viewItem_: {
    width: sizes._screen_width * 0.23,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.height_item,
    ...styles_c.border_bottom,
    borderRightWidth: 1,
    paddingHorizontal: 4,
  },
  textTitle: {
    ...styles_c.font_text_12bold,
    textAlign: 'center',
  },
});
