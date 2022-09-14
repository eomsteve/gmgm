import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import './navbtn.css';
interface NavMainProps {}

const NavMain: FunctionComponent<NavMainProps> = () => {
  return (
    <>
      <label htmlFor="cb" className="fixed gm-nav-main">
      </label>
      <input id="cb" type="checkbox" />
    </>
  );
};

export default NavMain;
