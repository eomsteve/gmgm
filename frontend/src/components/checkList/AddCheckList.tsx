import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addCheckList } from '@apis/checkList.Api';

interface AddCheckListProps {}

const AddCheckList: FC<AddCheckListProps> = () => {
  const navigate = useNavigate();
  const onClickHandle = async () => {
    const data = await addCheckList();
    navigate(`/checklists/${data.checklistId}`);
  };
  return (
    <>
      <div
        onClick={() => {
          onClickHandle();
        }}
        className="checklist-item flex-column m-3 flex h-36 items-center justify-center rounded border border-gray-300"
      >
        <div className="flex flex-col items-center justify-center ">
          <div className="text-[2rem]">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCheckList;
