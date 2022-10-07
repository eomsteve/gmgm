import { FC } from 'react';

interface BasicCheckListProps {}

const BasicCheckList: FC<BasicCheckListProps> = () => {
  return (
    <>
      <div className="center container m-3 ml-3 grid w-[90vw] grid-cols-5 border-black py-5 px-2 shadow-md lg:py-0 ">
        <div className="flex-rows flex justify-center"></div>
        <span className="col-span-3 ml-2 flex items-center p-1"> hello</span>
        <div className="flex justify-center"></div>
      </div>
    </>
  );
};

export default BasicCheckList;
