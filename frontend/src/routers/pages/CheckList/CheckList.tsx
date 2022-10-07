import { FC } from 'react';
import BusinessSelector from '@src/components/checkList/CheckListMainBusinessSelector';

interface CheckListProps {}

const CheckList: FC<CheckListProps> = () => {
  return (
    <>
      <main className="mb-[5rem] flex w-full flex-col justify-center bg-[white] p-0">
        <BusinessSelector optionList={['']} />
      </main>
    </>
  );
};

export default CheckList;
