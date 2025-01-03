/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, memo, FC, useEffect, useCallback} from 'react';
import {
  FlatList,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import sizes from '../../assets/styles/sizes';
import colors from '../../assets/styles/colors';

interface BottomSlideImageProps {
  data?: TypeThumbnails[];
  is_active: number;
  setIsActive: (val: number) => void;
}

const BottomSlideImage: FC<BottomSlideImageProps> = ({
  data = [],
  is_active = 0,
  setIsActive,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const animationValues = useRef(
    data?.map(() => new Animated.Value(1)),
  ).current;

  const animateItem = (index: number) => {
    if (animationValues?.[index]) {
      Animated.sequence([
        Animated.timing(animationValues[index], {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animationValues[index], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handlePress = (index: number) => {
    setIsActive(index);
    animateItem(index);
    const screenWidth = Dimensions.get('window').width;
    flatListRef.current?.scrollToOffset({
      offset: index * (sizes._55sdp + 12) - screenWidth / 2 + sizes._55sdp / 2,
      animated: true,
    });
  };

  const renderItem = useCallback(
    ({item, index}: {item: TypeThumbnails; index: number}) => {
      if (item.type === 'video') {
        return null;
      }
      return (
        <TouchableOpacity
          onPress={() => handlePress(index)}
          style={styles.itemContainer}>
          <View
            style={{
              borderRadius: 8,
              borderWidth: is_active === index ? 2 : 0,
              borderColor:
                is_active === index ? colors.appDefault : 'transparent',
            }}>
            <View
              style={[
                styles.imageBox,
                {
                  backgroundColor:
                    is_active === index ? colors.appDefault : '#D9D9D95C',
                },
              ]}>
              <FastImage
                source={{uri: item.src || ''}}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [is_active],
  );

  useEffect(() => {
    setIsActive(is_active);
    animateItem(is_active);
    const screenWidth = Dimensions.get('window').width;
    flatListRef.current?.scrollToOffset({
      offset:
        is_active * (sizes._55sdp + 12) - screenWidth / 2 + sizes._55sdp / 2,
      animated: true,
    });
  }, [is_active]);

  if (!data?.length) {
    return (
      <FlatList
        key={'skeleton'}
        data={[1, 1, 1, 1, 1, 1, 1]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => (
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="pulse"
            style={styles.skeleton}
            width={sizes._55sdp}
            height={sizes._55sdp}
          />
        )}
        contentContainerStyle={{paddingLeft: 6}}
      />
    );
  }

  return (
    <FlatList
      key={'flatlist'}
      ref={flatListRef}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{paddingLeft: 6}}
      getItemLayout={(_, index) => ({
        length: sizes._55sdp + 12,
        offset: (sizes._55sdp + 12) * index,
        index,
      })}
      initialScrollIndex={is_active}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  imageBox: {
    width: sizes._55sdp,
    height: sizes._55sdp,
    borderRadius: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  skeleton: {
    backgroundColor: '#C7CCD3',
    margin: 6,
    borderRadius: 3,
  },
});

export default memo(BottomSlideImage);
