import { FC } from 'react';
import Category from '@components/SelectProduct/checkList/CheckListCategoryComponent';
// import SelectedArea from '@components/SelectProduct/checkList/SelectedArea';
import ChecklistHeader from '@components/EmptyHeader';

const CheckListSelectionPage: FC = () => {
  return (
    <>
      <ChecklistHeader title="장보기 품목 추가하기" />
      <Category />
    </>
  );
};

export default CheckListSelectionPage;
