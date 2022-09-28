import { FC } from 'react';
import Category from '../../../components/SelectProduct/CategoryComponent'
import SelectedArea from '../../../components/SelectProduct/SelectedArea';

 
const FavoriteSelectionPage: FC = () => {
  return ( <>
  <Category />
  <SelectedArea />
  </> );
}
 
export default FavoriteSelectionPage;