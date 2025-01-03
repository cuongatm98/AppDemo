/* eslint-disable react-native/no-inline-styles */
import colors from '../assets/styles/colors';
import React from 'react';
import {ActivityIndicator, View, StyleProp, ViewStyle} from 'react-native';
interface LoadingBaseProps {
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const LoadingBase: React.FC<LoadingBaseProps> = ({
  size,
  style,
  color = colors.appDefault,
}) => {
  return (
    <View
      style={[
        style,
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
      ]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
export default LoadingBase;
