import {FunctionComponent} from 'react';
import SumPriceChart from '../charts/SumPriceChart'

interface PriceChartProps {
  
}
 
const PriceChart: FunctionComponent<PriceChartProps> = () => {
  return (<>
    <div className="mb-[20vh] ">
      <div className="flex justify-between m-3">
      <span>총 가격 변동 그래프</span>
      <span> total price</span>
      </div>
    <SumPriceChart />
    </div>
  </>);
}
 
export default PriceChart;