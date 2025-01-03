/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import sizes from '../../../assets/styles/sizes';
import styles_c from '../../../assets/styles/styles_c';

type ItemSkeletonBaseProps = {
  size?: number;
  type?: 'row' | 'colum';
};

const ItemSkeletonBase: FC<ItemSkeletonBaseProps> = ({
  size = sizes._screen_width / 2.2,
  type,
}) => {
  if (type === 'row') {
    return (
      <View style={styles.content}>
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="pulse"
          style={{
            borderRadius: 8,
            backgroundColor: '#C7CCD3',
          }}
          width={size / 2.2}
          height={size / 2.2}
        />
        <View style={[{flex: 1, gap: 12, justifyContent: 'space-between'}]}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="pulse"
            width={size}
            height={sizes._30sdp}
          />
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="pulse"
            style={{backgroundColor: '#C7CCD3'}}
            height={sizes._16sdp}
          />
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="pulse"
            style={{backgroundColor: '#C7CCD3'}}
            height={sizes._16sdp}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={[styles_c.box_shadow, {gap: 8, width: size, borderRadius: 8}]}>
      <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="pulse"
        style={{
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          backgroundColor: '#C7CCD3',
        }}
        width={size}
        height={size}
      />
      <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="pulse"
        width={size}
        height={sizes._40sdp}
      />
      <View style={[styles_c.row_beetween, {gap: 4, paddingBottom: 12}]}>
        <View style={[{flex: 1, gap: 4}]}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="pulse"
            style={{backgroundColor: '#C7CCD3'}}
            height={sizes._15sdp}
          />
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="pulse"
            style={{backgroundColor: '#C7CCD3'}}
            height={sizes._15sdp}
          />
        </View>
        <Skeleton
          circle
          LinearGradientComponent={LinearGradient}
          animation="pulse"
          style={{backgroundColor: '#C7CCD3'}}
          width={sizes._30sdp}
          height={sizes._30sdp}
        />
      </View>
    </View>
  );
};

export default ItemSkeletonBase;

const styles = StyleSheet.create({
  content: {
    ...styles_c.box_shadow,
    ...styles_c.row_beetween,
    gap: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
  },
});
