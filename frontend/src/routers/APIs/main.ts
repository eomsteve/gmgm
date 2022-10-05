import axios from 'axios';

const API_URL = 'https://j7d108.p.ssafy.io/api/main';
export interface MainData {
  checklistList?: {checklistId : number, regDate:string, itemInfos: {
    productName: string;
    status: boolean;
  }[];}[],
  cpi : {value : number, researchDate:string},
  favoriteIndex?: {value: number, researchDate:string},
  newsList : {id: number, title: string, link: string, pubDate: string}[],
  gmgmIndex : {value: number, researchDate:string},
  username?: string
}
export const loadMain  = async (jwtToken : string | null) => {
  try {
    if(jwtToken !== null) {
      const {data} = await axios({
        url: API_URL,
        method: 'GET',
        headers :{
          Authorization : jwtToken
        },
      })
      // console.log(data);
    return data;
    }else{
      const {data} = await axios({
        url: API_URL,
        method: 'GET'
      })
      console.log(data);
      return data;
    }
  } catch (error) {
    
  }
};
