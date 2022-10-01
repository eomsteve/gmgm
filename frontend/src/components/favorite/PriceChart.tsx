import { FunctionComponent } from 'react';
import SumPriceChart from '../charts/SumPriceChart';

interface PriceChartProps {
  favoriteTotalPrices: {
    totalPrices: { price: number }[];
    researchDates: { researchDate: string }[];
  };
}

const PriceChart: FunctionComponent<PriceChartProps> = props => {
  const { favoriteTotalPrices } = props;
  console.log(favoriteTotalPrices.totalPrices.at(-1)?.price);

  return (
    <>
      <div className="mb-[20vh]">
        <div className="mb-2 flex items-center">
          <span className="text-lg">총 가격 변동 그래프</span>
          <span className="ml-2 text-xs text-gray-500">
            즐겨찾기 목록의 총 가격 변화를 확인할 수 있어요.
          </span>
        </div>
        <span className="flex justify-end">
          현재 가격 총합 {favoriteTotalPrices.totalPrices.at(-1)?.price}원
        </span>
        <SumPriceChart favoriteTotalPrices={favoriteTotalPrices} />
      </div>
    </>
  );
};

export default PriceChart;
