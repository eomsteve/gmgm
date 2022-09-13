import React, { FunctionComponent } from 'react';
import {Outlet} from 'react-router-dom'
interface NavMainProps {
  
}
 
const NavMain: FunctionComponent<NavMainProps> = () => {
  return (
    <div>
      <button>
      NavButton
      </button>
      <Outlet/>
    </div>
    
  );
}
 
export default NavMain;