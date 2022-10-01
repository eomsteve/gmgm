import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calculator from './Calculator';
import { atCheckList } from '@apis/detail';
import OnlineCard from './OnlineCard';

interface DetailSelectBoxProps {}
const DetailSelectBox: FC<DetailSelectBoxProps> = props => {
  const { productId, businessType } = useParams();
  let goodsList: string[] = [];
  let goodsInfo: { goodsId: number; goodsName: string }[] = [
    {
      goodsId: 1,
      goodsName: '듀라셀 울트라 파워체크 AAA*2입',
    },
    {
      goodsId: 5,
      goodsName: 'goods5',
    },
  ];
  let productPrices: { price: number; researchDate: string }[] = [];
  useEffect(() => {
    // get data
    const getData = async () => {
      const { data } = await atCheckList(productId, businessType);
      console.log(data);
    };

    getData();
    //goodsList = loadData.goodsList
  }, []);
  const navigate = useNavigate();
  const optionList = ['m', 'o'];
  const [optionState, setOption] = useState<string>('m');
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };
  // const getGoodsItemInfo = (goodsId, ) => {

  // }
  return (
    <>
      <span>가격 변동 그래프</span>
      <div className="flex items-center">
        <select
          onChange={handleSelection}
          className="form-select form-select-sm m-3 block max-w-[25vw] rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-xs font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          aria-label=".form-select-sm example"
        >
          {goodsInfo.map(goods => (
            <option value={goods.goodsName} key={goods.goodsId}>
              {goods.goodsName}
            </option>
          ))}
        </select>
        <p className="text-[0.9rem]">선택한 상품의 가격 정보를 제공합니다.</p>
      </div>
      <Calculator />
      <OnlineCard />
    </>
  );
};

export default DetailSelectBox;
