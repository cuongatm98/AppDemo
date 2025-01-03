/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback, useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import sizes from '../../assets/styles/sizes';
import colors from '../../assets/styles/colors';
import BottomSlideImage from './BottomSlideImage';
import styles_c from '../../assets/styles/styles_c';

interface SlideImageProps {
  data?: TypeThumbnails[];
  autoplay?: boolean;
}
export const cutString = (text?: string) =>
  text?.replace(/(\.jpg_100x100|_300x300\.jpg|\.jpg_300x300)/g, '');

const SlideImage: React.FC<SlideImageProps> = ({
  data = [],
  autoplay = false,
}) => {
  const [is_active, setIsActive] = useState(0);
  const carouselRef = useRef<Carousel<TypeThumbnails>>(null);

  const renderItem = useCallback(
    ({item, index}: {item: TypeThumbnails; index: number}) => {
      if (item.type === 'video') {
        return null;
      }
      return (
        <TouchableOpacity key={index} onPress={() => {}}>
          <FastImage
            style={styles.image}
            source={{
              uri: cutString(item.src!),
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      );
    },
    [],
  );

  useEffect(() => {
    carouselRef.current?.snapToItem(is_active);
  }, [is_active]);

  return (
    <View style={{flex: 1}}>
      {/* <ImageView
        images={newData}
        imageIndex={is_active}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      /> */}
      {data?.length > 0 ? (
        <View>
          <Carousel
            ref={carouselRef}
            data={data}
            renderItem={renderItem}
            onSnapToItem={setIsActive}
            autoplay={autoplay}
            sliderWidth={sizes._screen_width}
            itemWidth={sizes._screen_width}
          />
          <View style={styles.counterContainer}>
            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {is_active + 1}/{data?.length}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="pulse"
          style={{backgroundColor: colors.gray}}
          width={sizes._screen_width}
          height={sizes._screen_width}
        />
      )}
      <BottomSlideImage
        setIsActive={index => {
          setIsActive(index);
          carouselRef.current && carouselRef.current.snapToItem(index);
        }}
        data={data}
        is_active={is_active}
      />
    </View>
  );
};

export default memo(SlideImage);

const styles = StyleSheet.create({
  image: {
    width: sizes._screen_width,
    height: sizes._screen_width,
  },
  imageContainer: {
    height: sizes._screen_width,
    width: sizes._screen_width,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'flex-end',
    right: 16,
  },
  counter: {
    borderRadius: 6,
    backgroundColor: '#00000069',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.appDefault,
  },
  counterText: {
    ...styles_c.font_text_12,
    color: colors.white,
  },
  video: {
    width: '100%',
    height: 300,
  },
});
