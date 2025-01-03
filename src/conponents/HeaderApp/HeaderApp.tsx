/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {ComponentProps, memo, useEffect, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {Header, HeaderProps} from '@rneui/themed';
import styles_c from '../../assets/styles/styles_c';
import colors from '../../assets/styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface HeaderAppProps extends HeaderProps {
  position?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  showIconLeft?: boolean;
  title?: string;
  headerBackgroundColor?:
    | Animated.AnimatedInterpolation<string | number>
    | string;
  onGoBack?: () => void;
}

const HeaderApp: React.FC<HeaderAppProps> = ({
  position = true,
  showIconLeft = true,
  onGoBack,
  ...props
}) => {
  return (
    <Animated.View
      style={[
        position ? styles.headerHomePosition : styles.headerHome,
        {backgroundColor: props.headerBackgroundColor},
      ]}>
      <Header
        backgroundColor="#00000000"
        statusBarProps={{animated: true, barStyle: 'light-content'}}
        leftComponent={
          showIconLeft ? (
            <TouchableOpacity
              style={[position ? styles_c.viewIconHeader : styles.iconLeft]}
              onPress={onGoBack}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={colors.white}
                style={{}}
              />
            </TouchableOpacity>
          ) : (
            props.leftComponent
          )
        }
        rightComponent={props.rightComponent}
        barStyle="default"
        centerComponent={
          props.centerComponent
            ? props.centerComponent
            : {text: props.title, style: styles.heading}
        }
        centerContainerStyle={[
          props.centerContainerStyle
            ? props.centerContainerStyle
            : {
                justifyContent: 'center',
              },
          !props.leftComponent &&
            !showIconLeft && {
              paddingVertical: 6,
            },
        ]}
        containerStyle={
          props.containerStyle
            ? props.containerStyle
            : {
                height: 'auto',
                alignItems: 'center',
                paddingVertical: 0,
                paddingBottom: 8,
                borderBottomWidth: 0,
              }
        }
        placement="center"
      />
    </Animated.View>
  );
};

export default memo(HeaderApp);

const styles = StyleSheet.create({
  heading: {
    ...styles_c.font_text_18bold,
    color: colors.textWhite,
  },
  headerHomePosition: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerHome: {},
  iconLeft: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
