import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddCheckList from '@components/checkList/AddCheckList';
import CheckListItem from '@components/checkList/CheckListItem';
import { getCheckLists } from '@apis/checkList.Api';
import type { CheckList } from '@apis/checkList.Api';
interface CheckListsProps {}

const CheckLists: FunctionComponent<CheckListsProps> = () => {
  const [checkListItems, setCheckListItems] = useState<CheckList[]>([]);
  useEffect(() => {
    const getCheckListsData = async () => {
      const data = await getCheckLists();
      setCheckListItems(data)
    };
    getCheckListsData();
  }, []);
  return (
    <>
      <main
        className="my-[5rem] grid w-full
    grid-cols-3 content-start bg-[white] p-5"
      >
        <AddCheckList />

        {
          checkListItems.map((checkList)=>{
            return <CheckListItem checklistId={checkList.checklistId} regDate={checkList.regDate} />
          })
        }
      </main>
    </>
  );
};

export default CheckLists;
