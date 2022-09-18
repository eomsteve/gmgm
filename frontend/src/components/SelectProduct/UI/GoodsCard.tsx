import { FC } from 'react';
interface GoodsCardProps {
  img: string;
}

const GoodsCard: FC<GoodsCardProps> = props => {
  const { img } = props;
  console.log("card");
  
  return (
    <div className="m-4 flex flex-col items-center justify-center p-0">
      <img className="border p-0" src={img} />
      <p> goods </p>
    </div>
  );
};

export default GoodsCard;
