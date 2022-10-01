import { FC } from 'react';
import Category from '@components/SelectProduct/CategoryComponent';
import SelectedArea from '@components/SelectProduct/SelectedArea';
import FavHeader from '@components/EmptyHeader';

const FavoriteSelectionPage: FC = () => {
  return (
    <>
      <FavHeader title="즐겨찾기 상품 추가하기" />
      <div className="h-[72.5vh]">
        <Category />
      </div>
      <div className="h-[25vh]">
        <SelectedArea/>
      </div>
    </>
  );
};

export default FavoriteSelectionPage;
