/* eslint-disable react-native/no-inline-styles */
import {Skeleton} from '@rneui/themed';
import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {DataBannersHome} from '../../api/homeApi';
import sizes from '../../assets/styles/sizes';
import Carousel, {Pagination} from 'react-native-snap-carousel';

type CardCaroulselProps = {
  data: DataBannersHome[];
};

const CardCaroulsel: FC<CardCaroulselProps> = ({data}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({
    item,
    index,
  }: {
    item: DataBannersHome;
    index: number;
  }) => {
    if (!item.active) {
      return null;
    }
    return (
      <View key={index} style={styles.slide}>
        <FastImage
          style={{
            height: sizes._screen_width / 1.8,
            width: sizes._screen_width,
          }}
          source={{uri: item.url!}}
          resizeMode="stretch"
        />
      </View>
    );
  };

  const pagination = (
    <Pagination
      dotsLength={data?.length || 1}
      activeDotIndex={activeSlide}
      containerStyle={{
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
      }}
      dotStyle={{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return (
    <View>
      {data && Array.isArray(data) && data.length > 0 ? (
        <Carousel
          data={data || []}
          renderItem={renderItem}
          sliderWidth={sizes._screen_width}
          itemWidth={sizes._screen_width}
          loop={true}
          autoplay
          decelerationRate="fast" // Làm mượt hiệu ứng cuộn
          autoplayDelay={4000}
          onSnapToItem={index => setActiveSlide(index)}
        />
      ) : (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="pulse"
          style={{backgroundColor: '#C7CCD3'}}
          width={sizes._screen_width}
          height={sizes._screen_width / 1.8}
        />
      )}
      {pagination}
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    borderRadius: 8,
    height: sizes._screen_width / 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#333',
  },
});

export default CardCaroulsel;
