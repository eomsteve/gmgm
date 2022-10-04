import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Signup } from '../../assets/icons/signup.svg';
import { ReactComponent as Login } from '../../assets/icons/login.svg';

import { useNavigate } from 'react-router-dom';

const MainGuestCard: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="center m-5 mx-8 grid grid-cols-6 rounded border border-gray-300 py-4 px-2 lg:py-0 ">
      <div className="flex-rows flex items-center justify-center">
        {/* <FontAwesomeIcon  icon={faUser} className=" text-[1.6rem] flex justify-center Heart text-[#428BC1] p-[0.3rem]" /> */}
        <User width="1.6rem" height="1.6rem" />
      </div>
      <span className="col-span-3 mx-2 flex items-center p-1">안녕하세요!</span>
      <div className="flex flex-col item-center -0"
        onClick={()=>{
          navigate('/signup')
        }}>
        <div className="flex items-center justify-center">
          <Signup
            width="1.6rem"
            height="1.6rem"
          />
        </div>
        <span className="text-xs text-center">회원가입</span>
      </div>
      <div className="flex flex-col item-center -0 cursor-pointer"
        onClick={()=>{
          navigate('/login')
        }}>
        <div className="flex items-center justify-center">
          <Login
            width="1.6rem"
            height="1.6rem"
          />
        </div>
        <span className="text-xs text-center">로그인</span>
      </div>
    </div>
  );
};

export default MainGuestCard;
