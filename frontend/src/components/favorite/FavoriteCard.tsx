import { FC } from 'react';
import { ReactComponent as Equal } from '@src/assets/icons/equals.svg';
import { ReactComponent as Down } from '@src/assets/icons/down.svg';
import { ReactComponent as Up } from '@src/assets/icons/up.svg';
import { ReactComponent as Chart } from '@src/assets/icons/chart.svg';
import { useNavigate } from 'react-router-dom';
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
      <div className="m-3 my-1 grid w-[86vw] grid-cols-12 items-center rounded border border-gray-300 p-2">
        <div className="flex-rows col-span-2 flex h-12 w-12 justify-center">
          <img src={img} />
        </div>
        <span className="col-span-6 ml-3 truncate p-1"> {goodsName}</span>

        <span className="col-span-1 flex justify-center truncate ">
          {priceGap > 0 ? (
            <Up width="1rem" height="1rem" />
          ) : priceGap < 0 ? (
            <Down width="1rem" height="1rem" />
          ) : (
            <Equal width="1rem" height="1rem" />
          )}
        </span>
        <span className="col-span-2 mr-2 flex justify-end">{goodsPrice}</span>
        <span className="col-span-1 flex justify-center">
          <Chart width="1.2rem" height="1.2rem" />
        </span>
      </div>
    </>
  );
};

export default FavoriteCard;
