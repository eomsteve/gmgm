import React, { FunctionComponent, useState } from 'react';
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

import type { GoodsInfo } from '@components/Detail/DetailSelect'

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
      min : 10,
      grid: {
        display: true,
      },
    },
  },
};

interface SumPriceChartProps {
  productName : string;
  productPrices: {price: number}[];
  researchDates: {researchDate: string }[];
  calculatorData?: {calPrice: number, calMeasure:number};
  goodsData?:GoodsInfo;
  unit : number;
}

const SumPriceChart: FunctionComponent<SumPriceChartProps> = props => {
  // 라벨의 길이만큼 만들기
  const { calculatorData, goodsData,  productPrices, researchDates, unit, productName } = props;
  let calculatorDataset = {};
  let goodsDataset = {};
  const goodsName = goodsData? goodsData.goodsName : "상품을 선택해주세요"
  const labels = researchDates.map((data) => {
    return data.researchDate
  })
  const productData = calculatorData ?  productPrices.map((data)=>{
    return (data.price * (calculatorData.calMeasure / unit)) 
  }): productPrices.map((data)=>{
    return (data.price) 
  })
  const calData =calculatorData ? labels.map(() => {
    return (calculatorData.calPrice)}) : labels.map(() => {
      return (calculatorData);
  });
  const goodsChartData = calculatorData ? goodsData ? goodsData.goodsPrices.map((data) => {
    return (data.price * (calculatorData.calMeasure / unit));
  }) : labels.map(() => {
    return undefined;
  }) : goodsData ? goodsData.goodsPrices.map((data) => {
    return (data.price);
  }) : labels.map(() => {
    return undefined;
  })

  if (calculatorData) {
    const calData = labels.map(() => {
      return calculatorData;
    });
    calculatorDataset = {
      data: calData,
      borderColor: 'rgb(255, 99, 13)',
      backgroundColor: 'rgba(255, 99, 13, 0.5)',
      borderDash: [5],
        fill: false,
        pointRadius: 0,
    };
  }
  
  const data = {
    labels,
    datasets: [
      {
        label: productName+"류",
        data: productData,
        borderColor: '#639DEB',
        backgroundColor: '#9ADCFF',
        fill: false,
        pointRadius: 0,
      },
      {
        label: goodsName,
        //라벨의 길이만큼 data 넣기,, 빈 데이터는??
        data: goodsChartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '계산결과',
        data: calData,
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
