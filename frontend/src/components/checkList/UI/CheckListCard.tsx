import  React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckListProps{
  isEdit: boolean;
  customProductName?: string;
  basicProductName?: string;
}
const CheckListCard : FC<CheckListProps> = (props) =>{
  const {customProductName, basicProductName, isEdit} = props;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckState = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setIsChecked(!isChecked);
  }
  return (
    <>
      <div className="m-2 py-2 ml-3 shadow-md container center grid grid-cols-6 w-[90vw] px-2 lg:py-0 border-black items-center ">
      <input disabled={isEdit} onChange={handleCheckState} className="ml-4 h-[20px] w-[20px]" type="checkbox" id={customProductName || basicProductName} />
      <label className={`col-span-3 flex items-center p-1 ${!isChecked? '' : 'line-through text-gray-500'}`} htmlFor={customProductName || basicProductName}><span> {customProductName || basicProductName}</span></label>
      <div onClick={()=>{navigate('/')}} className="flex items-center justify-center">
        {basicProductName && <span> 추세 </span>}
      </div>
      <div onClick={()=>{navigate('/')}} className="flex items-center justify-center">
        {basicProductName && (isEdit ? <span> ⛔ </span> :<span> 📈 </span>)}
        {customProductName && isEdit && <span> ⛔ </span>}
      </div>
    </div>
    </>
  );
};

export default CheckListCard;