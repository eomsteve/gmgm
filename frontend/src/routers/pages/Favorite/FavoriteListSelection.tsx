import { FC } from 'react';
import Category from '../../../components/SelectProduct/CategoryComponent'
import Product from '../../../components/SelectProduct/ProductComponent'
export interface FavoriteSelectionPageProps {
}
 
const FavoriteSelectionPage: FC<FavoriteSelectionPageProps> = () => {
  return ( <>
  <Category />
  {/* <Product /> */}
  </> );
}
 
export default FavoriteSelectionPage;