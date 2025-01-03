import {FlatList, StyleSheet, View, FlatListProps} from 'react-native';
import React, {FC, memo, useCallback} from 'react';
import ItemProductBase from './components/ItemProductBase';
import ItemSkeletonBase from './components/ItemSkeletonBase';
import sizes from '../../assets/styles/sizes';
import {DataProductsHome} from '../../api/homeApi';
// Định nghĩa type cho component của bạn bằng cách kết hợp với FlatListProps
type ListProductBaseProps = FlatListProps<DataProductsHome> & {
  isLoading?: boolean;
  data: DataProductsHome[]; // Thuộc tính tùy chỉnh của bạn
  item_type?: 'row' | 'colum';
  size?: number;
  showFavourite?: boolean;
  onChangeItem?: (item: DataProductsHome) => void;
  // Các thuộc tính tùy chỉnh khác có thể được thêm vào đây
};

const ListProductBase: FC<ListProductBaseProps> = ({
  isLoading,
  data,
  item_type = 'colum',
  size,
  showFavourite = true,
  onChangeItem,
  ...props
}) => {
  const renderItem = useCallback(
    ({item, index}: {item: DataProductsHome; index: number}) => {
      if (!item.id) {
        return (
          <View key={index} style={{}}>
            <ItemSkeletonBase size={size} type={item_type} />
          </View>
        );
      }
      return (
        <View key={index} style={{}}>
          <ItemProductBase
            showFavourite={showFavourite}
            item_type={item_type}
            name={item.name!}
            price={item.price!}
            totalBuy={item.qty!}
            image={item.image!}
            rePurchaseRate={item.rePurchaseRate!}
            monthSold={item.monthSold!}
            provider={item.provider!}
            product_id={showFavourite ? item.id! : item.itemId!}
            size={size}
            onChangeItem={() => {
              onChangeItem && onChangeItem(item);
            }}
            link={item.url!}
            promotionPrice={item.promotionPrice! ?? item.price!}
          />
        </View>
      );
    },
    [item_type, onChangeItem, showFavourite, size],
  );

  return (
    <View style={styles.container}>
      <FlatList
        {...props}
        data={
          !isLoading && data && Array.isArray(data)
            ? data
            : ([1, 1, 1, 1, 1, 1, 1, 1] as any)
        }
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{height: sizes._screen_height / 2}}></View>
        }
      />
    </View>
  );
};

export default memo(ListProductBase);

const styles = StyleSheet.create({
  container: {flex: 1},
});
