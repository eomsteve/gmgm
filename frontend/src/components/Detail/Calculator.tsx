import { FC, useState } from 'react';
import SumPriceChart from '../charts/CalculatorChart';
import type { GoodsInfo } from './DetailSelect';
interface CalculatorProps {
  measure: string;
  goodsProps?: GoodsInfo;
  productPrices: {price: number}[];
  researchDates: {researchDate: string }[];
  unit : number;
  productName : string
}

interface CalculatorInput {
  calPrice: number;
  calMeasure: number;
}

const Calculator: FC<CalculatorProps> = props => {
  const { measure, goodsProps, productPrices, researchDates, unit, productName } = props;
  console.log(goodsProps);

  const [usingCalculator, setUsingCalculator] = useState<boolean>(false);
  const [calPrice, setCalPrice] = useState<number>();
  const [calMeasure, setCalMeasure] = useState<number>();
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>();

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value;
    return setCalPrice(Number(event));
  };
  const handleMeasureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value;
    return setCalMeasure(Number(event));
  };

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (calPrice && calMeasure){
      setUsingCalculator(true);
      return setCalculatorData({calPrice, calMeasure});
    }else{
      return setCalculatorData(undefined)
    }
  };
  return (
    <>
      <div className="mb-3">
        <SumPriceChart calculatorData={calculatorData} productPrices={productPrices} researchDates={researchDates} goodsData={goodsProps}  unit={unit} productName={productName}/>
      </div>
      <div className="text-sm">
        <div className="text-[1rem] mb-1">{`${researchDates[researchDates.length - 1].researchDate} 가격 (${unit}${measure})`}</div>
        <div className="text-[#639DEB]">{`${productName} : ${Math.round(productPrices[productPrices.length - 1].price)} 원`}</div>
        {goodsProps && <div className="text-[#ff6384]">{`${goodsProps.goodsName} : ${Math.round(goodsProps.goodsPrices[goodsProps.goodsPrices.length - 1].price)} 원`}</div>}
        {usingCalculator && calPrice && calMeasure && (
            <div className="mt-1 text-[#ff630d]">
              <span>{`계산 결과 : ${calPrice / calMeasure * unit} 원`}</span>
            </div>
          )}
      </div>
      <hr className="mx-[-1.25rem] my-1 mt-5 w-screen" />
      <div className="mt-4 mb-3 flex w-full flex-col">
        <span className="text-lg">
          계산기
          <span className="ml-2 text-xs text-gray-500">
            비교를 원하는 상품의 가격과 용량을 입력해주세요.
          </span>
        </span>
        <div className="m-2">
          <form
            onSubmit={calculate}
            className="flex-rows grid grid-cols-5 grid-rows-2 items-center text-sm"
          >
            <span className="m-1 text-center">상품 가격</span>
            <input
              type="number"
              name="calPrice"
              id="calPrice"
              onChange={handlePriceInput}
              className="col-span-2 my-1 rounded border-solid border-gray-300 py-1 px-2 text-xs"
            />
            <span className="mx-2 text-sm">원</span>
            <span className="m-1 text-center">상품 용량</span>
            <input
              type="number"
              name="calMeasure"
              id="calMeasure"
              onChange={handleMeasureInput}
              className="col-span-2 my-1 rounded border-solid border-gray-300 px-2 py-1 text-xs"
            />
            <span className="mx-2">{measure}</span>
            <button className="col-start-5 row-span-2 row-start-1 my-2 rounded border border-gray-700 bg-white p-2 sm:text-[0.9rem]">
              계산하기
            </button>
          </form>
          {usingCalculator && calPrice && calMeasure && (
            <div className="mt-5 text-center">
              가격이 계산되었습니다. 그래프를 확인해주세요.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;
