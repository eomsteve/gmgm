import { FC } from 'react';
import Category from '../../../components/SelectProduct/CategoryComponent'
import Subject from '../../../components/SelectProduct/SubjectComponent'
export interface FavoriteSelectionPageProps {
}
 
const FavoriteSelectionPage: FC<FavoriteSelectionPageProps> = () => {
  return ( <>
  <Category />
  {/* <Subject /> */}
  </> );
}
 
export default FavoriteSelectionPage;