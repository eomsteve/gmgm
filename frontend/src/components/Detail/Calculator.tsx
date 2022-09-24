import { FC, useState } from 'react';
import SumPriceChart from '../charts/SumPriceChart'

interface CalculatorProps {}

const Calculator: FC<CalculatorProps> = () => {
  const [usingCalculator, setUsingCalculator] = useState<boolean>(false);
  const [goodsPrice, setGoodsPrice] = useState<number>();
  const [goodsMeasure, setGoodsMeasure] = useState<number>();
  
  const [calculatorData, setCalculatorData] = useState<number>();

  const handlePriceInput = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const event = e.target.value;
    return setGoodsPrice(Number(event));
  }
  const handleMeasureInput = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const event = e.target.value;
    return setGoodsMeasure(Number(event));
  }

  const calculate = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsingCalculator(true)
    console.log(goodsPrice, goodsMeasure);
    
  }
  return (
    <>
    <div className="my-5">

    <SumPriceChart />
    </div>
      <div className="flex w-full flex-col px-3 py-4 shadow-md">
        <span className="text-[0.8rem]">계산기</span>
        <p className="my-3 text-[0.8rem]">
          비교를 원하는 상품 가격과 용량을 입력해주세요.
        </p>
        <form onSubmit={calculate} className="flex flex-rows">
          <div className="flex flex-col w-[40%] ">
            <span className="m-1 text-xs">상품 가격</span>
            <div className="flex text-xs justify-start">
              <input
                type="number"
                name="goodsPrice"
                id="goodsPrice"
                onChange={handlePriceInput}
                className="max-w-[60%] border-[1px] border-black text-xs"
              />
              <span className="mx-2">원</span>
            </div>
          </div>
          <div className="flex flex-col w-[40%]">
            <span className="m-1 text-xs">용량</span>
            <div className="flex text-xs">
              <input
                type="number"
                name="measure"
                id="measure"
                onChange={handleMeasureInput}
                className="max-w-[60%] border-[1px] border-black text-xs"
              />
              <span className="mx-2">{"용량"}</span>
            </div>
          </div>
          <button className="">
            <span className="border-black border-2 p-1 text-[0.7rem] sm:text-[0.9rem]"> 계산하기 </span>
          </button>
        </form>
        {usingCalculator && <div className="text-[0.8rem] text-center mt-3">
          가격이 계산되었습니다. 그래프를 확인해 주세요.
        </div>}
      </div>
    </>
  );
};

export default Calculator;
