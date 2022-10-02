import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MainBtn from '../components/NavBtn/NavMainButton';
import HomeBtn from '../components/NavBtn/NavHomeBtn';
import CheckListBtn from '../components/NavBtn/NavCheckListBtn';
import FavBtn from '../components/NavBtn/NavFavBtn'
import FabButton from '@src/components/NavBtn/testNav';
import { Outlet } from 'react-router-dom';
interface NavBtnProps {}

const NavBtn: FunctionComponent<NavBtnProps> = () => {
  return (
    <>
    <Outlet />
    <FabButton />
    </>
  );
};

export default NavBtn;
