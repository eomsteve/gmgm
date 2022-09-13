import React, { FunctionComponent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface CheckListsProps {}

const  CheckLists: FunctionComponent<CheckListsProps> = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[white]">
      this is  CheckLists page
    </main>
  );
};

export default  CheckLists;
