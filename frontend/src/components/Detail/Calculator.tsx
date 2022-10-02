import { FC, useState } from 'react';
import SumPriceChart from '../charts/CalculatorChart';

interface CalculatorProps {
  measure : string;
}

const Calculator: FC<CalculatorProps> = (props) => {
  const {measure} = props;
  const [usingCalculator, setUsingCalculator] = useState<boolean>(false);
  const [goodsPrice, setGoodsPrice] = useState<number>();
  const [goodsMeasure, setGoodsMeasure] = useState<number>();
  const [calculatorData, setCalculatorData] = useState<number>();

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value;
    return setGoodsPrice(Number(event));
  };
  const handleMeasureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value;
    return setGoodsMeasure(Number(event));
  };

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsingCalculator(true);
    console.log(goodsPrice, goodsMeasure);
    return setCalculatorData(goodsPrice);
  };
  return (
    <>
      <div className="mb-3">
        <SumPriceChart calculatorData={calculatorData} />
      </div>
      <div className="mt-5 flex w-full flex-col">
        <span className="text-lg">
          계산기
          <span className="ml-2 text-xs text-gray-500">
            비교를 원하는 상품 가격과 용량을 입력해주세요.
          </span>
        </span>
        <div className="m-2">
          <form
            onSubmit={calculate}
            className="flex-rows flex grid grid-cols-5 text-sm"
          >
            <div className="col-span-2 flex grid grid-rows-2 flex-col ">
              <span className="m-1">상품 가격</span>
              <div className="flex items-center justify-start">
                <input
                  type="number"
                  name="goodsPrice"
                  id="goodsPrice"
                  onChange={handlePriceInput}
                  className="max-w-[60%] rounded border-solid border-gray-300 py-1 px-2 text-xs"
                />
                <span className="mx-2 text-sm">원</span>
              </div>
            </div>
            <div className="col-span-2 flex grid grid-rows-2 flex-col">
              <span className="m-1">용량</span>
              <div className="flex items-center">
                <input
                  type="number"
                  name="measure"
                  id="measure"
                  onChange={handleMeasureInput}
                  className="max-w-[60%] rounded border-solid border-gray-300 px-2 py-1 text-xs"
                />
                <span className="mx-2">{'용량'}</span>
              </div>
            </div>
            <button className="my-2 rounded border border-gray-700 p-2 sm:text-[0.9rem]">
              계산하기
            </button>
          </form>
          {usingCalculator && (
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
