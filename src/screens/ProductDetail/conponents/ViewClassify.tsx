import {StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useEffect, useState} from 'react';
import {
  Maybe,
  TypeClassify,
  TypePropValues,
  TypeSkuProperties,
} from '@app-schemas/server';
import styles_c from '../../../assets/styles/styles_c';
import ViewItemsValues from './ViewItemsValues';
import _ from 'lodash';

type value = {
  index: number;
  value: string;
};

export type TypeSkuMappings = {
  skuID: string;
  price: number;
  promotionPrice: number;
  quantity: number;
  transportFee: number;
  imageURL: string;
  status: boolean;
  amountOnSale: number;
  skuName: string;
  sName: string;
};

type ViewClassifyProps = {
  data?: TypeClassify;
  onChangeValue: (e: TypeSkuMappings) => void;
  onZoomImage?: (val: string) => void;
};

const ViewClassify: FC<ViewClassifyProps> = ({
  data,
  onChangeValue,
  onZoomImage,
}) => {
  const {skuImages, skuMappings, skuProperties} = data || {}; // Tránh lỗi undefined
  const [check_result, setCheckResult] = useState(true);
  const [values, setValues] = useState<value[]>([]);

  const onChange = (e: string, i: number) => {
    setValues(prev => {
      const newValues = [...prev];
      newValues[i] = {
        index: i,
        value: e,
      };
      return newValues; // Trả về mảng mới đã được cập nhật
    });
  };

  useEffect(() => {
    if (!values.length) {
      return;
    }

    let dataSkuMappings: any = skuMappings;
    // Tạo chuỗi 'value' từ mảng 'values'
    const joinedValues = _.join(_.map(values, 'value'), '@');
    const result = {...dataSkuMappings?.[joinedValues], skuName: joinedValues};
    if (result.skuID && check_result) {
      // Nếu có kết quả và check_result là false
      onChangeValue?.(result);
      setCheckResult(true); // Đặt check_result để tránh lặp lại
    } else if (!result.skuID && values.length > 1) {
      // Nếu không có kết quả và length > 1
      // Chỉ đảo ngược và tìm lại khi không có kết quả và check_result là false
      const reversedValues = values.slice().reverse();
      const reversedJoinedValues = _.join(_.map(reversedValues, 'value'), '@');
      const reversedResult = {
        ...dataSkuMappings?.[reversedJoinedValues],
        skuName: reversedJoinedValues,
      };
      // In ra chuỗi reversed để kiểm tra nếu cần
      if (reversedResult) {
        // Trả kết quả từ dataSkuMappings với giá trị đảo ngược
        onChangeValue?.(reversedResult);
        setCheckResult(false); // Đặt check_result để tránh lặp lại
      }
    }
  }, [onChangeValue, values, skuMappings, check_result]);

  return (
    <View style={styles.container}>
      {Array.isArray(skuProperties) &&
        skuProperties.map((item: Maybe<TypeSkuProperties>, index: number) => {
          return (
            <View key={index}>
              <View style={styles.view_title}>
                <Text style={styles_c.font_text_14}>{item?.propName}</Text>
                <Text style={[styles_c.font_text_14]}>
                  {item?.propValues?.length || 0} mẫu
                </Text>
              </View>
              {Array.isArray(item?.propValues) && (
                <ViewItemsValues
                  index_={index}
                  propID={item.propID!}
                  skuImages={skuImages as string}
                  data={item?.propValues as TypePropValues[]}
                  onChange={onChange}
                  onZoomImage={onZoomImage}
                />
              )}
            </View>
          );
        })}
    </View>
  );
};

export default memo(ViewClassify);

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 16,
  },
  view_title: {
    padding: 12,
    ...styles_c.row_beetween,
  },
});
