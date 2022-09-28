import  React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckListProps{
  customProductName?: string;
  BasicProductName?: string;
}
const CheckListCard : FC<CheckListProps> = (props) =>{
  const {customProductName, BasicProductName} = props;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckState = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setIsChecked(!isChecked);
  }
  return (
    <>
      <div className="m-3 py-2 ml-3 shadow-md container center grid grid-cols-5 w-[90vw] px-2 lg:py-0 border-black ">
      <input onChange={handleCheckState} className="ml-4 h-[100%] w-[40%]" type="checkbox" id={customProductName} />
      <label className={`col-span-3 flex items-center p-1 ${!isChecked? '' : 'line-through text-gray-500'}`} htmlFor={customProductName}><span> {customProductName}</span></label>
      <div onClick={()=>{navigate('/')}} className="flex items-center justify-center">
        <span> {'>>'} </span>
      </div>
    </div>
    </>
  );
};

export default CheckListCard;