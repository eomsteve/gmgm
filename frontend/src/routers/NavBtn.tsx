import {FunctionComponent} from 'react';
import {Link} from 'react-router-dom'


interface NavBtnProps {
  
}
 
const NavBtn: FunctionComponent<NavBtnProps> = () => {
  return (<nav className="nav-btn"
  >
    <Link to="/invoices">Invoices</Link> |{" "}
    <Link to="/expenses">Expenses</Link>
  </nav>);
}
 
export default NavBtn;