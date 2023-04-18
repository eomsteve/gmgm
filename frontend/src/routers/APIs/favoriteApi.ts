import { client } from './client';

type ChartData = {
  values: { value: number }[];
  researchDates: { researchDate: string }[];
};

type BusinessType = {
  businessType: string;
  krName: string;
};

export type FavoriteItem = {
  goodsId: number;
  basicProductId: number;
  goodsName: string;
  img: string;
  measure: string;
  priceGapOff: number;
  recentPriceOff: number;
  priceGapOn: number;
  recentPriceOn: number;
};
export interface FavoritePageData {
  businessTypes: BusinessType[];
  countryIndices: ChartData;
  favoriteIndices: ChartData;
  favoriteItems: FavoriteItem[];
  favoriteTotalPrices: {
    totalPrices: { price: number }[];
    researchDates: { researchDate: string }[];
  };
  favoriteRecommends: { goodsId: number; goodsName: string; img: string }[];
}
export const getFavoritePageData = async () => {
  try {
    const { data } = await client.get<FavoritePageData>('/api/favorite');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFavoriteItems = async (businessType: string) => {
  const { data } = await client.get(
    '/api/favorite/business/' + businessType + '/',
  );
  return data;
};

export const getFavoriteSelect = async () => {
  const { data } = await client.get('/api/favorite/select');
  return data;
};

export const getGoodsDataByProductId = async (productId: number) => {
  const { data } = await client.get(
    `/api/favorite/select/product/${productId}`,
  );
  return data;
};
