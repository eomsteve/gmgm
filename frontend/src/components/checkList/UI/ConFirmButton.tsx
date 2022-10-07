import { FC } from 'react';

const ConfirmButton: FC = props => {
  return (
    <>
      <button className="flex items-center justify-center">
        <span className="m-[0.87rem] rounded-full border-[1px] border-gray-600 p-1 px-3 text-xs font-normal">
          완료
        </span>
      </button>
    </>
  );
};

export default ConfirmButton;
