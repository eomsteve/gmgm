import React, { FunctionComponent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddCheckList from '../../../components/checkList/AddCheckList';
import CheckListItem from '../../../components/checkList/CheckListItem';

interface CheckListsProps {}

const CheckLists: FunctionComponent<CheckListsProps> = () => {
  return (
    <>
      <main
        className="my-[5rem] grid p-5
    w-full grid-cols-3 content-start bg-[white]"
      >
        <AddCheckList />
        <CheckListItem checklistId={123} regDate={'2022-09-16'} />
      </main>
    </>
  );
};

export default CheckLists;
