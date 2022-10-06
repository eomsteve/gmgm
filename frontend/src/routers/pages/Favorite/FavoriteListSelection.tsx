import { FC } from 'react';
import Category from '@components/SelectProduct/CategoryComponent';
import SelectedArea from '@components/SelectProduct/SelectedArea';
import FavHeader from '@components/EmptyHeader';
import { useSelector } from 'react-redux';
import { RootState } from '@src/modules/store';
import SpinnerPage from '../Spinner';

const FavoriteSelectionPage: FC = () => {
  const { isLoading } = useSelector((state: RootState) => {
    return {
      isLoading: state.persistedReducer.favoriteProductListReducer.isLoading,
    };
  });
  console.log(' category fav isLoading : ', isLoading);

  return (
    <>
      <FavHeader title="즐겨찾기 상품 추가하기" />
      {isLoading && <SpinnerPage />}
      <div className="h-[72.5vh]">
        <Category />
      </div>
      <div className="h-[25vh]">
        <SelectedArea />
      </div>
    </>
  );
};

export default FavoriteSelectionPage;
