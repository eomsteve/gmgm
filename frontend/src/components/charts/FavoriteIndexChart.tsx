import React, { FunctionComponent } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      align: "start" as const
    },
    title: {
      display: true,
      text: '지수 그래프',
      position: 'top' as const,
      align: "start" as const
    },
  },
};
// 라벨의 길이만큼 만들기 
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '즐겨찾기 지수',
      //라벨의 길이만큼 data 넣기,, 빈 데이터는??
      data: [1, 2, null, 4, 5, 4, 7],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '가물가물 지수',
      data: [3, 6, null, 4, 2, 3, 1],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
interface FavoriteIndexChartProps {
  
}
 
const FavoriteIndexChart: FunctionComponent<FavoriteIndexChartProps> = () => {
  return (
    <div className="flex h-auto w-auto justify-center items-center shadow-md mx-3">

  <Line options={options} data={data} />
    </div>
  );
}
 
export default FavoriteIndexChart;