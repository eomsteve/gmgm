import { FC, useState } from 'react';
import SumPriceChart from '../charts/CalculatorChart';

interface CalculatorProps {}

const Calculator: FC<CalculatorProps> = () => {
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
      <div className="my-5 flex w-full flex-col">
        <span>계산기</span>
        <div className="mx-3">
          <p className="my-3 text-[0.9rem]">
            비교를 원하는 상품 가격과 용량을 입력해주세요.
          </p>
          <form onSubmit={calculate} className="flex-rows flex text-sm">
            <div className="flex w-[40%] flex-col ">
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
            <div className="flex w-[40%] flex-col">
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
            <button className="rounded border border-gray-700 px-2 sm:text-[0.9rem]">
              계산하기
            </button>
          </form>
          {usingCalculator && (
            <div className="mt-5 text-center text-[0.9rem]">
              가격이 계산되었습니다. 그래프를 확인해주세요.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;
