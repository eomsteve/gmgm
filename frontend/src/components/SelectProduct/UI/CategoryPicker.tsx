import { FC } from 'react';
interface CategoryPickerProps {
  categoryImg: string;
  categoryName: string;
}

const CategoryPicker: FC<CategoryPickerProps> = props => {
  const { categoryImg, categoryName } = props;
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <img className="h-[7vh] rounded-full p-0" src={categoryImg} />
      <p>{categoryName}</p>
    </div>
  );
};

export default CategoryPicker;
