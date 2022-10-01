import { FC } from 'react';

interface FavoriteCardProps {
  img: string;
  goodsName: string;
  priceGap: number;
  goodsPrice: number;
}
const FavoriteCard: FC<FavoriteCardProps> = props => {
  const { img, goodsName, priceGap, goodsPrice } = props;
  return (
    <>
      <div className="m-3 my-1 grid w-[86vw] grid-cols-6 items-center rounded border border-gray-300 p-2">
        <div className="flex-rows flex h-12 w-12 justify-center">
          <img src={img} />
        </div>
        <span className="col-span-3 ml-2 flex items-center truncate p-1">
          {' '}
          {goodsName}
        </span>
        <div className="flex justify-center">
          <span className="col-span-3 ml-2 flex items-center p-1">
            {' '}
            {priceGap}{' '}
          </span>
          <span className="col-span-3 ml-2 flex items-center p-1">
            {' '}
            {goodsPrice}
          </span>
        </div>
      </div>
    </>
  );
};

export default FavoriteCard;
