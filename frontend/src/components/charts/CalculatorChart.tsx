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
      fontFamily: 'Do Hyeon',
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
  // productData : [];
  calculatorData?: number;
  // goodsData?:[];
}

const SumPriceChart: FunctionComponent<SumPriceChartProps> = props => {
  // 라벨의 길이만큼 만들기
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const { calculatorData } = props;
  const data2 = labels.map(() => {
    return calculatorData;
  });
  let calculatorDataset = {};

  if (calculatorData) {
    const data2 = labels.map(() => {
      return calculatorData;
    });
    calculatorDataset = {
      // label: '계산결과',
      data: data2,
      borderColor: 'rgb(255, 99, 13)',
      backgroundColor: 'rgba(255, 99, 13, 0.5)',
    };
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'prices',
        //라벨의 길이만큼 data 넣기,, 빈 데이터는??
        data: [3123, 12312, 54345, 21314.42, 87643, 101000, 89000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '계산결과',
        data: data2,
        borderColor: 'rgb(255, 99, 13)',
        backgroundColor: 'rgba(255, 99, 13, 0.5)',
        borderDash: [5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };
  return (
    <div className="flex h-[30vh] w-auto items-center justify-center">
      <Line options={options} data={data} />
    </div>
  );
};

export default SumPriceChart;
