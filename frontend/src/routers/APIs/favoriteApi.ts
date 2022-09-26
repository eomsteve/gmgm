import axios from 'axios';
const API_URL = 'https://j7d108.p.ssafy.io/api/favorite';
const AUTH_TOKEN = 'token';

type ChartData = {
  researchDate: string;
  value: number;
};

type BusinessType = {
  businessType: string;
  krName: string;
};
interface FavoritePageData {
  countryIndices: ChartData[];
  favoriteIndices: ChartData[];
  businessTypes: BusinessType[];
  favoriteItemResponseDtos?: [];
  favoriteTotalPrices?: [];
}
export const getFavoritePageData = async () => {
  try {
    const { data } = await axios.get<FavoritePageData>(API_URL + '/');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const  getFavoriteItems = async (businessType : string) => {
  try{
    const { data } = await axios.get(API_URL + '/business/' + businessType + '/', {
      headers : {
        Authorization : AUTH_TOKEN
      }
    })
  }catch(error){

  }
}

export const getFavoriteSelect = async () => {
  try {
    const {data} = await axios.get(API_URL + '/select');
    // console.log(data);
    return data;
  } catch (error) {
    
  }
}


export const getGoodsDataByProductId = async (productId : number) => {
  try{
    const { data } = await axios.get(API_URL + `/select/product/${productId}`);
    console.log(data);
    return data;
    
  }catch (error) {

  }
}