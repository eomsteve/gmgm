import { FC } from 'react';
import DetailSelectBox from '../../../components/Detail/DetailSelect'

interface DetailPageProps {
  
}
 
const DetailPage: FC<DetailPageProps> = () => {
  return (
    <main className="flex  w-full flex-col p-3 pb-[5rem] bg-[white]">
      
      <DetailSelectBox />
    </main>
  );
}
 
export default DetailPage;