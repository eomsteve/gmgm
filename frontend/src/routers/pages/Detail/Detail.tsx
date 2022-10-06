import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import DetailSelectBox from '@components/Detail/DetailSelect';
import DetailHeader from '@components/EmptyHeader';

interface DetailPageProps {}

const DetailPage: FC<DetailPageProps> = () => {
  const location = useLocation();
  let params = location.state as {
    from: string;
    isEdit: boolean;
    checklistId?: string;
  };
  console.log('detail:', params);

  return (
    <>
      <DetailHeader title="가격 비교" isDetail={true} detailParams={params} />
      <main className="mb-[8rem] flex w-full flex-col bg-[white] p-5">
        <DetailSelectBox />
      </main>
    </>
  );
};

export default DetailPage;
