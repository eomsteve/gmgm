import {FC} from 'react';

interface ConfirmButtonProps {
  
}
 
const ConfirmButton: FC<ConfirmButtonProps> = () => {
  return (
    <>
      <button className="flex justify-center items-center">
        <span className="p-1 text-xs font-normal rounded-full border-[1px] px-3 border-black">완료</span>
      </button>
    </>
  );
}
 
export default ConfirmButton;