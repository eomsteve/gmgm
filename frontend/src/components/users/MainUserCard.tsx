import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

import { useNavigate } from 'react-router-dom';

const MainUserCard: FC = () => {
  return (
    <div className="center m-5 mx-8 grid grid-cols-6 rounded border border-gray-300 py-4 px-2 lg:py-0 ">
      <div className="flex-rows flex items-center justify-center">
        {/* <FontAwesomeIcon  icon={faUser} className=" text-[1.6rem] flex justify-center Heart text-[#428BC1] p-[0.3rem]" /> */}
        <User width="1.6rem" height="1.6rem" />
      </div>
      <span className="col-span-4 mx-2 flex items-center p-1"> hello</span>
      <div className="flex items-center justify-center">
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
