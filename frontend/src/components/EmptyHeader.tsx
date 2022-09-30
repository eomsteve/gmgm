import { FC } from 'react';
import { ReactComponent as Back } from '../assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = props => {
  const { title } = props;
  const navigate = useNavigate();
  return (
    <>
      <header className="center grid h-[4rem] grid-cols-8 justify-center border-b p-2">
        <div className="flex items-center justify-center">
          {title == '홈' ? (
            <div></div>
          ) : (
            <div
              onClick={() => {
                navigate(-1);
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
