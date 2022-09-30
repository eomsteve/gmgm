import { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = props => {
  const { title } = props;
  return (
    <>
      <header
        className="p-2 border-2 border-black grid grid-cols-5 center justify-center h-[4rem]"
      >
        <div className="flex justify-center items-center">
          아이콘 자리
        </div>
        <span className="flex justify-center items-center">{title}</span>
      </header>
    </>
  );
};

export default Header;
