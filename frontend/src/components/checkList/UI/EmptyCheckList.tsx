import  { Component, FC, CSSProperties, useState, useEffect} from 'react';

interface BasicCheckListProps {
  
}
 
const BasicCheckList: FC<BasicCheckListProps> = () => {
  return (<>
    <div className="m-3 py-5 ml-3 shadow-md container center grid grid-cols-5 w-[90vw] px-2 lg:py-0 border-black ">
    <div className="flex flex-rows justify-center">
    </div>
    <span className="flex items-center col-span-3 p-1 ml-2"> hello</span>
    <div className="flex justify-center">
    </div>
  </div>
  </>);
}
 
export default BasicCheckList;