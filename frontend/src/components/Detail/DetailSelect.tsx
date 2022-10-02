import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calculator from './Calculator';
import { atCheckList } from '@apis/detail';
import OnlineCard from './OnlineCard';

interface GoodsInfo{
  goodsId : number;
  goodsName : string;
}

interface ProductData {
  basicProductName : string;
  unit : number;
  measure : string;
  goodsInfos : GoodsInfo[];
  productPrices?:[]
  researchDates? : []
}

interface DetailSelectBoxProps {}
const DetailSelectBox: FC<DetailSelectBoxProps> = props => {
  const { productId, businessType } = useParams();
  const [goodsInfo, setGoodsInfo] = useState<GoodsInfo[]>([]);
  const [productData, setProductData] = useState<ProductData>();
  let goodsList: string[] = [];
  let productPrices: { price: number; researchDate: string }[] = [];
  useEffect(() => {
    // get data
    console.log("productId, businessType", productId, businessType);
    
    const getData = async () => {
      const { data } = await atCheckList(productId, businessType);
      setProductData(data);
    };

    getData();
    console.log(productData);
    
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
      <span className="text-lg">
        가격 변동 그래프
        <span className="ml-2 text-xs text-gray-500">
          선택한 상품의 가격 정보를 제공합니다.
        </span>
      </span>
      <div className="flex items-center">
        <select
          onChange={handleSelection}
          className="form-select form-select-sm m-2 block max-w-[25vw] rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-xs font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          aria-label=".form-select-sm example"
        >
          {productData && productData.goodsInfos.map(goods => (
            <option value={goods.goodsName} key={goods.goodsId}>
              {goods.goodsName}
            </option>
          ))}
        </select>
      </div>
      {productData && <Calculator measure={productData.measure}/>}
      <OnlineCard />
    </>
  );
};

export default DetailSelectBox;
