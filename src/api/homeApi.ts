import axiosInstance from './axiosInstance';

export interface TypeDataBannersHome {
  banners: DataBannersHome[];
}

export interface DataBannersHome {
  url: string;
  active: boolean;
  createdAt: string;
  type: string;
}

export interface TypeProductsHome {
  results: DataProductsHome[];
}

export interface DataProductsHome {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionPrice: number;
  url: string;
  currency: string;
  image: string;
  thumbnails: [string];
  store: string;
  source: number;
  provider: string;
  qty: string;
  monthSold: number;
  rePurchaseRate: string;
  tradeScore: string;
  isFavourite: Boolean;
  itemId: string;
}

export interface TypeDetailProducts {}

// GET danh sách người dùng
export const getBannersHome = async (): Promise<TypeDataBannersHome> => {
  const response = await axiosInstance.get('api/pandamall/v1/banners');
  return response.data.data;
};

export const getProducts = async (
  page?: number,
  size?: number,
): Promise<TypeProductsHome> => {
  const response = await axiosInstance.post('api/pandamall/v1/search', {
    page: page || 1,
    size: size || 20,
    provider: 'alibaba',
    keyword: 'shoe',
    sort: 'price_asc', // price_des, total_sales_asc, total_sales_des, tk_total_sales_asc, tk_total_sales_des, match_asc, match_des
  });
  return response.data.data;
};

export const getDetailProducts = async (
  item_id?: string,
  provider?: string,
): Promise<TypeDetailProducts> => {
  const response = await axiosInstance.post('api/pandamall/v1/item/details', {
    item_id: 684657158807,
    provider: 'alibaba',
  });
  console.log(item_id, provider, response);

  return response.data;
};
