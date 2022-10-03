import { FC, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import {logOutApi} from '@apis/userApi'
import { useNavigate } from 'react-router-dom';
import type { MainData } from '@apis/main'
import type { RootState, AppDispatch } from '@src/modules/store';
import { logOutApiRedux } from '@modules/Auth'
import { useSelector, useDispatch } from 'react-redux'

const MainUserCard: FC<{username?: string, email: string}> = (props) => {
  const { username, email } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();  
  return (
    <div className="center m-5 mx-8 grid grid-cols-6 rounded border border-gray-300 py-4 px-2 lg:py-0 ">
      <div className="flex-rows flex items-center justify-center">
        {/* <FontAwesomeIcon  icon={faUser} className=" text-[1.6rem] flex justify-center Heart text-[#428BC1] p-[0.3rem]" /> */}
        <User width="1.6rem" height="1.6rem" />
      </div>
      <span className="col-span-4 mx-2 flex items-center p-1">{username} 님, 안녕하세요!</span>
      <div className="flex flex-col item-center-0"
        onClick={()=>{
          dispatch(logOutApiRedux(email));
          navigate('/')
        }}>
        <div className="flex items-center justify-center">
          <Logout
            width="1.6rem"
            height="1.6rem"
          />
        </div>
        <span className="text-xs text-center">로그아웃</span>
      </div>
    </div>
  );
};

export default MainUserCard;
