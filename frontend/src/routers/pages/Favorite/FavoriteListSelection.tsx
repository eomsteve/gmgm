import { FC } from 'react';
import Category from '@components/SelectProduct/CategoryComponent';
import SelectedArea from '@components/SelectProduct/SelectedArea';
import FavHeader from '@components/EmptyHeader';

const FavoriteSelectionPage: FC = () => {
  return (
    <>
      <FavHeader title="즐겨찾기 상품 추가하기" />
      <Category />
      <SelectedArea />
    </>
  );
};

export default FavoriteSelectionPage;
