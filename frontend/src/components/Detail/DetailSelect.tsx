import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calculator from './Calculator';
import { atCheckList, detailSelectBoxChange, fromFavorite } from '@apis/detail';
import OnlineCard from './OnlineCard';

export interface GoodsInfo {
  cheapPrice: number;
  cheapUrl?: string;
  goodsImg: string;
  goodsPrices: { price: number }[];
  measure: string;
  researchDates: { researchDate: string }[];
  goodsName: string;
}

interface ProductData {
  basicProductName: string;
  unit: number;
  measure: string;
  goodsInfos: { goodsId: number; goodsName: string }[];
  productPrices: { price: number }[];
  researchDates: { researchDate: string }[];
}

interface DetailSelectBoxProps {}
const DetailSelectBox: FC<DetailSelectBoxProps> = props => {
  const { productId, businessType, goodsId } = useParams();
  const [goodsData, setGoodsData] = useState<GoodsInfo>();
  const [productData, setProductData] = useState<ProductData>();
  useEffect(() => {
    // get data
    console.log('productId, businessType', productId, businessType, goodsId);

    if (goodsId === undefined) {
      const getData = async () => {
        const data = await atCheckList(productId, businessType);
        setProductData(() => data);
        console.log(data);
      };
      getData();
    } else {
      const getDataFromFavorite = async () => {
        const data = await fromFavorite(productId, businessType, goodsId);
        setProductData(() => data.product);
        setGoodsData(() => data.goods);
      };
      getDataFromFavorite();
    }
  }, []);
  const [goodsInfo, setGoodsInfo] = useState<GoodsInfo>();
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const getGoodsDetails = async (goodsId?: string, businessType?: string) => {
      const data = await detailSelectBoxChange(goodsId, businessType);
      setGoodsInfo(() => data);
      console.log(goodsInfo);
      return data;
    };
    getGoodsDetails(e.target.value, businessType);
  };
  console.log();

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
          {productData && !goodsId && (
            <option value={productData.basicProductName}>
              {productData.basicProductName}류
            </option>
          )}
          {productData && goodsData && (
            <option value={goodsData.goodsName}>{goodsData.goodsName}</option>
          )}
          {productData &&
            goodsData &&
            productData.goodsInfos.map(goods => {
              if (goods.goodsName != goodsData.goodsName) {
                return (
                  <option value={goods.goodsId} key={goods.goodsId}>
                    {goods.goodsName}
                  </option>
                );
              }
            })}
          {productData &&
            !goodsData &&
            productData.goodsInfos.map(goods => {
              return (<option value={goods.goodsId} key={goods.goodsId}>
                {goods.goodsName}
              </option>)
            })}
        </select>
      </div>
      {productData && (
        <Calculator
          measure={productData.measure}
          goodsProps={goodsInfo ? goodsInfo : goodsData}
          productPrices={productData.productPrices}
          researchDates={productData.researchDates}
          unit={productData.unit}
          productName={productData.basicProductName}
        />
      )}
      <hr className="mx-[-1.25rem] my-1 w-screen" />
      {goodsInfo && <OnlineCard goodsProps={goodsInfo} />}
      {goodsData && !goodsInfo && <OnlineCard goodsProps={goodsData} />}
    </>
  );
};

export default DetailSelectBox;
