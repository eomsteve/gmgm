import { FC } from 'react';

import { ReactComponent as GoToCheck } from '../../assets/icons/gotocheck.svg';

import { useNavigate } from 'react-router-dom';
import CheckListItem from '@components/checkList/CheckListItem';

interface checkListItem {
  checklistId: number;
  regDate: string;
  itemInfos: {
    productName: string;
    status: boolean;
  }[];
}
interface checkListItems {
  checkLists: checkListItem[];
}

const MainChecklist: FC<checkListItems> = props => {
  const {checkLists} = props
  const navigate = useNavigate();
  const onClickHandle = async () => {
    navigate(`/checkLists`);
  };
  return (
    <>
      <div className="text-lg pt-8 pl-[2rem]">
        최근 장보기 내역
      </div>
      <main className="grid w-full grid-cols-3 content-start bg-[white] px-5 mb-[5rem]">
        {checkLists.map(checkList => {
          return (
            <div key={checkList.checklistId}>
              <CheckListItem
                checklistId={checkList.checklistId}
                regDate={checkList.regDate}
                itemInfos={checkList.itemInfos}
              />
            </div>
          );
        })}
        <div
          onClick={() => {
            onClickHandle();
          }}
          className="checklist-item flex-column m-3 flex h-36 items-center justify-center rounded border border-gray-300"
        >
          <div className="flex flex-col items-center justify-center ">
            <div>
              <GoToCheck width="2.5rem" height="2.5rem" />
            </div>
            <span className="text-md">
              더보기
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainChecklist;
