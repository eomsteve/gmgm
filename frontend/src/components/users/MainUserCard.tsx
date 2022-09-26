import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';



const MainUserCard : FC = () => { 
  return (
    <div className="m-3 py-5 ml-3 shadow-md container center grid grid-cols-5 w-[95%] px-2 lg:py-0 border-black ">
      <div className="flex flex-rows justify-center">
      <FontAwesomeIcon  icon={faUser} className=" text-[1.6rem] flex justify-center Heart text-[#428BC1] p-[0.3rem]" />
      </div>
      <span className="flex items-center col-span-3 p-1 ml-2"> hello</span>
      <div className="flex justify-center">
      <FontAwesomeIcon onClick={() => {console.log('logout')}}  icon={faRightFromBracket} className=" text-[1.6rem] flex justify-center Heart text-[#428BC1] p-[0.3rem]" />
      </div>
    </div>
  );
}

export default MainUserCard;