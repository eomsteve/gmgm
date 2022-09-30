import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

import { useNavigate } from 'react-router-dom';

const MainUserCard: FC = () => {
  return (
    <div className="center container m-3 ml-3 grid w-[95%] grid-cols-6 border-black py-5 px-2 shadow-md lg:py-0 ">
      <div className="flex-rows flex items-center justify-center">
        {/* <FontAwesomeIcon  icon={faUser} className=" text-[1.6rem] flex justify-center Heart text-[#428BC1] p-[0.3rem]" /> */}
        <User width="1.6rem" height="1.6rem" />
      </div>
      <span className="col-span-4 mx-2 flex items-center p-1"> hello</span>
      <div className="flex items-center justify-center">
        {/* <FontAwesomeIcon
          onClick={() => {
            console.log('logout');
          }}
          icon={faRightFromBracket}
          className=" Heart flex justify-center p-[0.3rem] text-[1.6rem] text-[#428BC1]"
        /> */}
        <Logout
          onClick={() => {
            console.log('logout');
          }}
          width="1.6rem"
          height="1.6rem"
        />
      </div>
    </div>
  );
};

export default MainUserCard;
