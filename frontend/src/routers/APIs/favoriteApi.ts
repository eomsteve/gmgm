import axios from 'axios';
const API_URL = 'http://j7d108.p.ssafy.io:8080/api/favorite';
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
    const { data } = await axios.get<FavoritePageData>(API_URL + '/', {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    console.log(data);
  } catch (error) {}
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
    console.log(data);
    
  } catch (error) {
    
  }
}