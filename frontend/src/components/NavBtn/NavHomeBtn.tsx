import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';


interface NavHomeBtnProps {}

const NavHomeBtn: FunctionComponent<NavHomeBtnProps> = () => {
  return <FontAwesomeIcon  icon={faHouseChimney} className="Heart gm-nav-home text-[#428BC1] p-[0.3rem]" />
};

export default NavHomeBtn;
