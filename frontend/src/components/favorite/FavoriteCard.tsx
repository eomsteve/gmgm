import { FC } from 'react';

interface FavoriteCardProps {
  img : string;
  goodsName : string;
  priceGap : number;
  goodsPrice : number;
}
const FavoriteCard : FC<FavoriteCardProps> = (props) =>{
  const {img , goodsName , priceGap, goodsPrice} = props;
  return (
    <>
      <div className="m-3 p-1 my-1 shadow-md container center grid grid-cols-6 w-[95%] px-2 lg:py-0 border-black ">
      <div className="flex flex-rows justify-center">
        <img src={img} />
      </div>
      <span className="flex items-center col-span-3 p-1 ml-2"> {goodsName}</span>
      <div className="flex justify-center">
        <span className="flex items-center col-span-3 p-1 ml-2"> {priceGap} </span>
      <span className="flex items-center col-span-3 p-1 ml-2"> {goodsPrice}</span>
      </div>
    </div>
    </>
  );
};

export default FavoriteCard;

