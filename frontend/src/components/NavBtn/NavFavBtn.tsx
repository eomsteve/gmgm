import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';


interface NavFavBtnProps {
  
}
 
const NavFavBtn: FunctionComponent<NavFavBtnProps> = () => {
  return <FontAwesomeIcon  icon={faStar} className="Heart gm-nav-fav text-[#428BC1] p-[0.3rem]" />
}
 
export default NavFavBtn;
