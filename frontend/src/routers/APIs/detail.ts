import axios from 'axios';

const API_URL = 'https://j7d108.p.ssafy.io/api/detail';



export const atCheckList  = async (productId : string | undefined, businessType : string | undefined) => {
  try {
    if (productId && businessType){
      const { data } = await axios({
        url : API_URL + `/product/${productId}/business/${businessType}/`,
        method : 'GET',
      });
      console.log(data);
      return data;
    }else{
      console.error(productId, businessType);
      
    }
  } catch (error) {
    
  }
};

export const fromFavorite = async (productId : string | undefined, businessType : string | undefined, goodsId : string | undefined) => {
  try {
    const { data } = await axios({
      url : API_URL + `/product/${productId}/goods/${goodsId}/business/${businessType}`,
      method : 'GET',
    });
    console.log(data);
    return data;
  } catch (error) {
    
  }

}

export const detailSelectBoxChange = async (goodsId : string | undefined, businessType: string | undefined) => {
  try {
    if (goodsId && businessType){
      const { data } = await axios({
        url : API_URL + `/goods/${goodsId}/business/${businessType}`,
        method : 'GET',
      })
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    
  }
}