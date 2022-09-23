import  { Component, FC, CSSProperties, useState, useEffect} from 'react';

interface CustomInputProps {
  
}
 
const CustomInput: FC<CustomInputProps> = () => {
  return (<>
    <div className="m-3 py-5 ml-3 shadow-md container center flex justify-center items-center w-[90vw] px-2 lg:py-0 border-black ">
      <input id="customInput" className="w-[100%] border-[1px] border-black" type="text" />
    
  </div>
  </>);
}
 
export default CustomInput;