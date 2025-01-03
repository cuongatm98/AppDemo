/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo, useEffect, useState} from 'react';
import styles_c from '../../../assets/styles/styles_c';
import colors from '../../../assets/styles/colors';
import sizes from '../../../assets/styles/sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isArray} from 'lodash';
import FastImage from 'react-native-fast-image';

const checkImage = (
  arr?: any[],
  objImage?: {[key: string]: string},
  propID?: string,
) => {
  if (arr?.length! <= 4) {
    return false;
  }
  if (arr?.length! > 12) {
    return true;
  }
  const hasMatchingValueID = arr?.some(item =>
    objImage?.hasOwnProperty(`${propID}:${item.valueID}`),
  );
  return !hasMatchingValueID;
};

const chunkArray = (arr?: any[], chunkSize?: number): any[][] => {
  if (!arr || !chunkSize) {
    return [];
  }
  const results = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    results.push(arr.slice(i, i + chunkSize));
  }
  return results;
};

type ViewItemsValuesProps = {
  index_: number;
  skuImages: any;
  propID?: string;
  data?: any[];
  onChange?: (e: string, i: number) => void;
  onZoomImage?: (val: string) => void;
};

const ViewItemsValues: FC<ViewItemsValuesProps> = ({
  index_,
  data,
  propID,
  skuImages,
  onChange,
  onZoomImage,
}) => {
  const [is_check, setIsCheck] = useState<string | undefined>('00');

  useEffect(() => {
    if (data && data.length > 0) {
      if (checkImage(data, skuImages)) {
        setIsCheck('00'); // Chọn item đầu tiên
        onChange && onChange(`${propID}:${data[0].valueID}`, index_);
      } else {
        setIsCheck('0'); // Chọn item đầu tiên
        onChange && onChange(`${propID}:${data[0].valueID}`, index_);
      }
    }
  }, [data]); // Gọi sự kiện khi data thay đổi

  const renderItem = ({item, index}: {item: any[] | any; index: number}) => {
    if (!isArray(item)) {
      return (
        <TouchableOpacity
          key={index}
          style={[]}
          onPress={() => {
            setIsCheck(String(index));
            onChange && onChange(`${propID}:${item.valueID}`, index_);
          }}>
          <View
            style={[
              styles.viewItem,
              {
                borderColor:
                  is_check === `${index}` ? colors.appDefault : colors.gray,
              },
            ]}>
            <View style={[{paddingHorizontal: 12, paddingVertical: 10}]}>
              <Text
                numberOfLines={2}
                style={[
                  styles_c.font_text_10,
                  {
                    color:
                      is_check === `${index}`
                        ? colors.appDefault
                        : colors.textBlack,
                  },
                ]}>
                {item.valueName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      // Thêm return ở đây để trả về JSX
      <View style={[item.length > 6 ? styles.row : {gap: 10}]} key={index}>
        {item.map((item_, i) => {
          let image = skuImages[`${propID}:${item_.valueID}`];
          return (
            <View
              key={i}
              style={[image && {maxWidth: 70, alignItems: 'center'}]}>
              <View
                style={[
                  styles.viewItem,
                  {
                    borderColor:
                      is_check === `${index}${i}`
                        ? colors.appDefault
                        : colors.gray,
                  },
                ]}>
                {image && (
                  <FastImage
                    style={{height: 60, width: 60, borderRadius: 6}}
                    source={{uri: image}}
                  />
                )}
                <View
                  style={[
                    image
                      ? {maxHeight: 40, paddingVertical: 4}
                      : {
                          paddingHorizontal: 6,
                          paddingVertical: 10,
                          maxWidth: 150,
                        },
                  ]}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles_c.font_text_10,
                      {
                        color:
                          is_check === `${index}${i}`
                            ? colors.appDefault
                            : colors.textBlack,
                      },
                    ]}>
                    {item_.valueName}
                  </Text>
                </View>
              </View>
              {image && (
                <MaterialIcons
                  name="zoom-out-map"
                  size={16}
                  style={{
                    position: 'absolute',
                    right: 6,
                    top: 4,
                    padding: 2,
                    color: colors.colorff5c00,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: colors.appDefaultOpaci,
                  }}
                  onPress={() => onZoomImage && onZoomImage(image)}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const groupedData = checkImage(data, skuImages) ? chunkArray(data, 2) : data; // Mỗi phần tử sẽ là một nhóm chứa 2 item

  return (
    <View style={{width: sizes._screen_width}}>
      <FlatList
        data={groupedData}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{gap: 8, paddingHorizontal: 12}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(ViewItemsValues);

const styles = StyleSheet.create({
  viewItem: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 2,
  },
  row: {
    flexDirection: 'column', // Tạo 2 dòng trong mỗi nhóm
    marginRight: 10,
    gap: 10,
    flex: 1,
  },
});
