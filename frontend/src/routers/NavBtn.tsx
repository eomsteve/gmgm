import { FunctionComponent } from 'react';
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
