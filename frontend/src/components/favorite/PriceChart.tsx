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
        <div className="mb-2 flex justify-between">
          <span>총 가격 변동 그래프</span>
          <span>{favoriteTotalPrices.totalPrices.at(-1)?.price}</span>
        </div>
        <SumPriceChart favoriteTotalPrices={favoriteTotalPrices} />
      </div>
    </>
  );
};

export default PriceChart;
