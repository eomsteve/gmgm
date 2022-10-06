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
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'center' as const,
    },
    title: {
      display: false,
      text: '지수 그래프',
      position: 'top' as const,
      align: 'center' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      min: 90,
      grid: {
        display: true,
      },
    },
  },
};
// 라벨의 길이만큼 만들기

interface FavoriteIndexChartProps {
  countryIndices: {
    values: { value: number }[];
    researchDates: { researchDate: string }[];
  };
  favoriteIndices?: {
    values: { value: number }[];
    researchDates: { researchDate: string }[];
  };
}

const FavoriteIndexChart: FunctionComponent<
  FavoriteIndexChartProps
> = props => {
  const { countryIndices, favoriteIndices } = props;
  const labels = countryIndices.researchDates.map(data => {
    return data.researchDate;
  });
  const countryValues = countryIndices.values.map(data => {
    return data.value;
  });
  const favoriteValues = favoriteIndices
    ? favoriteIndices.values.map(data => {
        return data.value;
      })
    : undefined;
  const data = {
    labels,
    datasets: [
      {
        label: '소비자물가 지수',
        //라벨의 길이만큼 data 넣기,, 빈 데이터는??
        data: countryValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '즐겨찾기 지수',
        data: favoriteValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 0,
      },
    ],
  };
  return (
    <div className="mb-2">
      <span className="mb-2 text-lg">
        지수 그래프
        <span className="ml-2 text-xs text-gray-500">
          즐겨찾기 목록으로 만들어진 지수를 CPI와 함께 볼 수 있어요.
        </span>
        <div className="text-sm text-gray-400"> 기준년도 : 2020 년 = 100</div>
      </span>
      <div className="flex h-[35vh] w-auto items-center justify-center">
        <Line options={options} data={data} />
      </div>
      <div className="mt-4 text-sx text-center text-gray-800">{`${countryIndices.researchDates[countryIndices.researchDates.length-1].researchDate} 일 기준`}</div>
      <div className="mt-2 flex justify-between">
        <div className="flex-col flex items-center">          
          <div className="text-[#ff6384]">
            {`소비자 물가 지수 : ${
              countryIndices.values[countryIndices.values.length - 1].value
            }`}
          </div>
        </div>
        <div className="flex-col flex items-center">
          {favoriteIndices && (
            <div className="text-[#639DEB]">{`즐겨찾기 지수 : ${
              favoriteIndices.values[favoriteIndices.values.length - 1].value
            }`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteIndexChart;
