import { FC } from 'react';
interface CategoryPickerProps {
  img: string;
}

const CategoryPicker: FC<CategoryPickerProps> = props => {
  const { img } = props;
  return (
    <div className="flex flex-col justify-center items-center p-0">
      <img className="rounded-full p-0 border" src={img} />
      <p> hello !</p>
    </div>
  );
};

export default CategoryPicker;
