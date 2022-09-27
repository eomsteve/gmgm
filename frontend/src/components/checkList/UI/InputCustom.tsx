import  { Component, FC, CSSProperties, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addCustomProducts } from '@modules/CheckListProductList'
interface CustomInputProps {
  
}
 

const CustomInput: FC<CustomInputProps> = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch();
  const getInputValue = (e : React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(e.target.value);
    setInputValue(()=>e.target.value)
  }
  const handelInput = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === 'Enter') {
      console.log(inputValue);
      setInputValue('')
    }
    // dispatch(addCustomProducts)
  } 
  return (<>
    <div className="m-3 py-5 ml-3 shadow-md container center flex justify-center items-center w-[90vw] px-2 lg:py-0 border-black ">
      <input value={inputValue} onChange={getInputValue} onKeyPress={handelInput} id="customInput" className="w-[100%] border-[1px] border-black" type="text" />
    
  </div>
  </>);
}
 
export default CustomInput;