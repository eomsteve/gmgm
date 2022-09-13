import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faListCheck } from '@fortawesome/free-solid-svg-icons';


interface NavCheckListBtnProps {}

const NavCheckListBtn: FunctionComponent<NavCheckListBtnProps> = () => {
  return <FontAwesomeIcon  icon={faListCheck} className="Heart gm-nav-check-list text-[#428BC1] p-[0.3rem]" />
};

export default NavCheckListBtn;
