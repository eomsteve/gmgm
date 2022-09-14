import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MainBtn from '../components/NavBtn/NavMainButton';
import HomeBtn from '../components/NavBtn/NavHomeBtn';
import CheckListBtn from '../components/NavBtn/NavCheckListBtn';
import FavBtn from '../components/NavBtn/NavFavBtn'

import { Outlet } from 'react-router-dom';
interface NavBtnProps {}

const NavBtn: FunctionComponent<NavBtnProps> = () => {
  return (
    <>
    <Outlet />
    <nav className="nav-btn">
      <MainBtn />
      <Link to="/"><HomeBtn /></Link>
      <Link to="/checkLists"><CheckListBtn /></Link>
      <Link to="/favorite"><FavBtn/></Link>
      {/* <Link to="/fav">favorite</Link>
    <Link to="/checkLists">check lists</Link> */}
    </nav>
    </>
  );
};

export default NavBtn;
