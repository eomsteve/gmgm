import axios from 'axios';
const API_URL = 'https://j7d108.p.ssafy.io/api/favorite';
const AUTH_TOKEN = 'token';

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
    const { data } = await axios.get<FavoritePageData>(API_URL + '/');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFavoriteItems = async (businessType: string) => {
  try {
    const { data } = await axios.get(
      API_URL + '/business/' + businessType + '/',
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      },
    );
    return data;
  } catch (error) {}
};

export const getFavoriteSelect = async () => {
  try {
    const { data } = await axios.get(API_URL + '/select');
    return data;
  } catch (error) {}
};

export const getGoodsDataByProductId = async (productId: number) => {
  try {
    const { data } = await axios.get(API_URL + `/select/product/${productId}`);
    return data;
  } catch (error) {}
};
