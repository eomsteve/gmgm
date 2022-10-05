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
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
};

interface SumPriceChartProps {
  favoriteTotalPrices: {
    totalPrices: { price: number }[];
    researchDates: { researchDate: string }[];
  };
}

const SumPriceChart: FunctionComponent<SumPriceChartProps> = props => {
  // 라벨의 길이만큼 만들기

  const { favoriteTotalPrices } = props;
  const labels = favoriteTotalPrices.researchDates.map(data => {
    return data.researchDate;
  });
  const totalPrices = favoriteTotalPrices.totalPrices.map(data => {
    return data.price;
  });
  const data = {
    labels,
    datasets: [
      {
        label: '총 변동',
        //라벨의 길이만큼 data 넣기,, 빈 데이터는??
        data: totalPrices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
    ],
  };
  return (
    <div className="flex h-[30vh] w-auto justify-center">
      <Line options={options} data={data} />
    </div>
  );
};

export default SumPriceChart;
