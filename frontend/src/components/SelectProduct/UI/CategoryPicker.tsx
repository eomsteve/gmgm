import { FC } from 'react';
interface CategoryPickerProps {
  categoryImg: string;
  categoryName : string;
}

const CategoryPicker: FC<CategoryPickerProps> = props => {
  const { categoryImg, categoryName } = props;
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <img className="rounded-full p-0 border" src={categoryImg} />
      <p>{ categoryName }</p>
    </div>
  );
};

export default CategoryPicker;
