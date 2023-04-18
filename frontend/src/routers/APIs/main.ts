import { client } from './client';

export interface MainData {
  checklistList?: {
    checklistId: number;
    regDate: string;
    itemInfos: {
      productName: string;
      status: boolean;
    }[];
  }[];
  cpi: { value: number; researchDate: string };
  favoriteIndex?: { value: number; researchDate: string };
  newsList: { id: number; title: string; link: string; pubDate: string }[];
  gmgmIndex: { value: number; researchDate: string };
  username?: string;
}

export const loadMainData = async () => {
  const { data: MainData } = await client.get('/api/main');
  return MainData;
};
