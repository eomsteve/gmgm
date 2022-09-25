import { FC } from 'react';
import Category from '../../../components/SelectProduct/CategoryComponent'
import Product from '../../../components/SelectProduct/ProductComponent'
import SelectedArea from '../../../components/SelectProduct/SelectedArea';
export interface FavoriteSelectionPageProps {
}
 
const FavoriteSelectionPage: FC<FavoriteSelectionPageProps> = () => {
  return ( <>
  <Category />
  <SelectedArea />
  </> );
}
 
export default FavoriteSelectionPage;