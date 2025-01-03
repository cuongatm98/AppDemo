import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import RenderHTML from 'react-native-render-html';
import sizes from '../assets/styles/sizes';

interface RenderHTMLBaseProps {
  html?: string; // Dấu "?" để chỉ ra rằng `html` là không bắt buộc
}

const RenderHTMLBase: React.FC<RenderHTMLBaseProps> = ({html = ''}) => {
  const convertHtml = (val: string) => {
    let val_ = val
      .replace(/<center>/g, '<div style="text-align: center;">')
      .replace(/<\/center>/g, '</div>')
      .replace(/<font(.*?)>(.*?)<\/font>/gi, '<span$1>$2</span>');
    return val_;
  };

  if (html === '') {
    return null; // Đảm bảo trả về `null` nếu không có nội dung HTML
  }
  return (
    <RenderHTML
      contentWidth={sizes._screen_width}
      source={{
        html: convertHtml(html),
      }}
      baseStyle={styles.baseStyle}
      ignoredDomTags={['font', 'map']} // Bỏ qua thẻ "map"
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {},
});

export default memo(RenderHTMLBase);
