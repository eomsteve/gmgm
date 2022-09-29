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
  maintainAspectRatio: false,
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

interface FavoriteIndexChartProps {
  countryIndices : {
    values : {value : number}[],
    researchDates : {researchDate : string}[]
  },
  favoriteIndices : {
    values : {value : number}[],
    researchDates : {researchDate : string}[]
  }
}
 
const FavoriteIndexChart: FunctionComponent<FavoriteIndexChartProps> = (props) => {
  const {countryIndices,favoriteIndices} = props;
  const labels = favoriteIndices.researchDates.map((data) => {
    return data.researchDate
  });
  const countryValues = countryIndices.values.map((data) =>{
    return data.value;
  })
  const favoriteValues = favoriteIndices.values.map((data) => {
    return data.value;
  })
  const data = {
    labels,
    datasets: [
      {
        label: '국가 지수',
        //라벨의 길이만큼 data 넣기,, 빈 데이터는??
        data: countryValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '즐겨찾기 지수',
        data: favoriteValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <div className="flex h-[70vh] w-auto justify-center items-center shadow-md mx-3">

  <Line options={options} data={data} />
    </div>
  );
}
 
export default FavoriteIndexChart;