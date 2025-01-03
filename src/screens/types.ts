import {ProductDetailProps} from './ProductDetail';

type TypeMainScreen = {
  HomeScreen: any;

  // Modal
};

type TypeTutorialScreen = {};

type TypeDrawerScreen = {
  BottomTabs: any;
  ProductDetail: ProductDetailProps;
  // AddressBook: any;
};

type TypeAppScreen = {
  Splash: any;
  TutorialApp: any;
  MainApp: any;
};

type TypeNavigation = TypeMainScreen &
  TypeTutorialScreen &
  TypeAppScreen &
  TypeDrawerScreen;

export type {
  TypeMainScreen,
  TypeTutorialScreen,
  TypeAppScreen,
  TypeNavigation,
  TypeDrawerScreen,
};
export type TypeMainKeys = keyof TypeMainScreen;
export type TypeTutorialKeys = keyof TypeTutorialScreen;
export type TypeDrawerKeys = keyof TypeDrawerScreen;
export type TypeAppKeys = keyof TypeAppScreen;
export type TypeNavigationKeys = keyof TypeNavigation;
