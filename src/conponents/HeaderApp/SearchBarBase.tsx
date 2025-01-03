/* eslint-disable react-native/no-inline-styles */
import React, {memo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SearchBarProps, SearchBar} from '@rneui/themed';
import sizes from '../../../assets/styles/sizes';
import styles_c from '../../../assets/styles/styles_c';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListTypeSearch from './ListTypeSearch';
import colors from '../../../assets/styles/colors';

type SearchBarBaseProps = SearchBarProps & {
  showComponentLeft?: boolean;
  onSearch: (value: string) => void;
  onClear?: () => void;
};
const SearchBarBase: React.FC<SearchBarBaseProps> = ({
  showComponentLeft,
  placeholder = 'Tìm kiếm...',
  onSearch,
  onClear,
  ...props // để truyền các prop khác từ SearchBarProps
}) => {
  const [searchValue, setSearchValue] = useState('');

  const searchBarRef = useRef<any>(null);

  const handleSearch = () => {
    onSearch(searchValue.length > 1 ? searchValue.trim() : props.value || '');
  };

  const handleClear = () => {
    setSearchValue('');
    onClear && onClear();
  };

  const renderClearIcon = () => (
    <View style={styles.clearIconContainer}>
      <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
        <AntDesign name="close" size={14} color={'white'} />
      </TouchableOpacity>
    </View>
  );

  const renderSearchIcon = () => (
    <View style={{borderRightWidth: 1, borderColor: colors.appDefault}}>
      <ListTypeSearch />
    </View>
  );
  return (
    <SearchBar
      placeholder={placeholder}
      ref={searchBarRef}
      value={searchValue}
      cancelButtonTitle={''}
      onChangeText={setSearchValue}
      platform="ios"
      style={[props.style, styles_c.font_text_14]}
      inputStyle={props.inputStyle ? props.inputStyle : styles.inputStyle}
      inputContainerStyle={
        props.inputContainerStyle
          ? props.inputContainerStyle
          : styles.inputContainerStyle
      }
      searchIcon={
        showComponentLeft ? (
          props.searchIcon ? (
            props.searchIcon
          ) : (
            renderSearchIcon()
          )
        ) : (
          <></>
        )
      }
      clearIcon={props.clearIcon ?? renderClearIcon()}
      onClear={handleClear}
      onSubmitEditing={handleSearch}
      containerStyle={
        props.containerStyle ? props.containerStyle : styles.containerStyle
      }
      {...props}
    />
  );
};

export default memo(SearchBarBase);

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: '#F6F6F6',
  },
  inputContainerStyle: {
    backgroundColor: '#F6F6F6',
    marginLeft: 0,
    marginRight: 0,
  },
  containerStyle: {
    backgroundColor: '#F6F6F6',
    height: sizes.height_item,
    width: '100%',
    borderRadius: 8,
  },
  clearIconContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  clearIcon: {
    height: sizes._20sdp,
    width: sizes._20sdp,
    borderRadius: sizes._10sdp,
    justifyContent: 'center',
    backgroundColor: '#C9C9C9',
    alignItems: 'center',
  },
});
