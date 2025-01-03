/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useMemo} from 'react';
import ListProductBase from '@app-components/ListProductBase';
import styles_c from '../../../assets/styles/styles_c';
import colors from '../../../assets/styles/colors';
import {ServerClient} from '@app-clients/server/server-client';
import {get} from '@app-helper';
import {useSearchProductListQuery} from '@app-hooks/gql-generated/server';

type SimilarProductsProps = {
  cate_id: string;
  name: string;
  provider: string;
};

function getFirstSixWords(input: string): string {
  // Tách chuỗi thành mảng các từ
  const words = input?.split(' ');

  // Lấy 6 từ đầu tiên từ mảng
  const firstSixWords = words?.slice(0, 6);

  // Nối các từ lại thành một chuỗi
  return firstSixWords?.join(' ');
}

const SimilarProducts: FC<SimilarProductsProps> = ({
  cate_id,
  name,
  provider,
}) => {
  const {data: resProductList} = useSearchProductListQuery({
    client: ServerClient,
    variables: {
      input: {
        categoryId: cate_id?.toString(),
        keyword: getFirstSixWords(name),
        provider: provider,
        page: 1,
        size: 20,
      },
    },
  });

  const dataProductList = useMemo(() => {
    return get(resProductList, d => d.searchProductList.data, undefined);
  }, [resProductList]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles_c.view_title,
          ...styles_c.row_beetween,
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            ...styles_c.font_text_16bold,
            color: colors.colorff5c00,
          }}>
          Sản phẩm tương tự
        </Text>
      </View>
      <ListProductBase
        item_type="colum"
        horizontal
        data={dataProductList?.results || []}
        contentContainerStyle={{gap: 12, margin: 12}}
        renderItem={undefined}
      />
    </View>
  );
};

export default memo(SimilarProducts);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
