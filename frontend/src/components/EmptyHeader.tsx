import { FC } from 'react';
import { ReactComponent as Back } from '../assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';
import { updateCheckListStatus } from '@apis/checkList.Api'

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = props => {
  const { title } = props;
  const navigate = useNavigate();
  return (
    <>
      <header className="center grid h-16 grid-cols-8 justify-center border-b p-2">
        <div className="flex items-center justify-center">
          {title == '홈' ? (
            <div></div>
          ) : (
            <div
              onClick={(title == '장보기 리스트') ? ()=>{navigate('/checkLists')} : () => {
                navigate( -1 );
              }}
            >
              <Back width="1.2rem" height="1.2rem" />
            </div>
          )}
        </div>
        <span className="col-span-7 ml-2 flex items-center pt-1 font-dohyeon text-2xl">
          {title}
        </span>
      </header>
    </>
  );
};

export default Header;
