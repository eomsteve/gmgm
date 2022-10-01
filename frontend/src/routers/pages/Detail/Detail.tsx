import { FC } from 'react';
import DetailSelectBox from '@components/Detail/DetailSelect';
import DetailHeader from '@components/EmptyHeader';

interface DetailPageProps {}

const DetailPage: FC<DetailPageProps> = () => {
  return (
    <>
      <DetailHeader title="가격 비교" />
      <main className="mb-[8rem] flex w-full flex-col bg-[white] p-5">
        <DetailSelectBox />
      </main>
    </>
  );
};

export default DetailPage;
