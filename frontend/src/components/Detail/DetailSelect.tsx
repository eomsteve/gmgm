import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calculator from './Calculator';
import { atCheckList, detailSelectBoxChange } from '@apis/detail';
import OnlineCard from './OnlineCard';

export interface GoodsInfo{
  cheapPrice : number;
  cheapUrl ?: string;
  goodsImg : string;
  goodsPrices: {price: number}[];
  measure : string;
  researchDates : { researchDate: string}[]
  goodsName : string;
}

interface ProductData {
  basicProductName : string;
  unit : number;
  measure : string;
  goodsInfos : {goodsId : number;
    goodsName : string;}[];
  productPrices?:[]
  researchDates? : []
}

interface DetailSelectBoxProps {}
const DetailSelectBox: FC<DetailSelectBoxProps> = props => {
  const { productId, businessType } = useParams();
  const [productData, setProductData] = useState<ProductData>();
  useEffect(() => {
    // get data
    console.log("productId, businessType", productId, businessType);
    
    const getData = async () => {
      const data = await atCheckList(productId, businessType);
      setProductData(() => data);
      console.log(data);
    };

    getData();
    
  }, []);
  const navigate = useNavigate();
  const optionList = ['m', 'o'];
  const [optionState, setOption] = useState<string>('m');
  const [goodsInfo, setGoodsInfo] = useState<GoodsInfo[]>([]);
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const getGoodsDetails = async (goodsId? : string, businessType? : string) => {
      const data = await detailSelectBoxChange(goodsId, businessType);
      setGoodsInfo(() => data);
      console.log(goodsInfo);
      
      return data;
    }
    getGoodsDetails(e.target.value, businessType);
    
  };

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
          className="form-select form-select-sm m-2 block rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1 text-xs font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          aria-label=".form-select-sm example"
        >
          {productData && <option value={productData.basicProductName} >
              {productData.basicProductName}
            </option>}
          {productData && productData.goodsInfos.map(goods => (
            <option value={goods.goodsId} key={goods.goodsId}>
              {goods.goodsName}
            </option>
          ))}
        </select>
      </div>
      {productData && <Calculator measure={productData.measure} goodsProps={goodsInfo}/>}
      <OnlineCard />
    </>
  );
};

export default DetailSelectBox;
