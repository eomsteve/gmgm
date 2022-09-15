import { FC } from 'react';
interface ProductCardProps {
  img: string;
}

const ProductCard: FC<ProductCardProps> = props => {
  const { img } = props;
  console.log("card");
  
  return (
    <div className="m-4 flex flex-col items-center justify-center p-0">
      <img className="border p-0" src={img} />
      <p> product </p>
    </div>
  );
};

export default ProductCard;
