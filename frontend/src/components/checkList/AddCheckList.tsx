import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {addCheckList} from '@apis/checkList.Api';

interface AddCheckListProps {
  
}
 
const AddCheckList: FC<AddCheckListProps> = () => {
  const navigate = useNavigate();
  const onClickHandle = async () => {
    const data = await addCheckList();
    navigate(`/checklists/${data.checklistId}`)
    
  }
  return ( <>
    <div
        onClick={() =>{onClickHandle() }}
        className="checklist-item m-5 flex-column flex h-[130px] w-[90px] items-center justify-center shadow-md"
      >
        <div className="flex flex-col items-center justify-center ">
          <div className="text-[2rem]"><FontAwesomeIcon icon={faPlus} /></div>
        </div>
      </div>
  </>);
}
 
export default AddCheckList;