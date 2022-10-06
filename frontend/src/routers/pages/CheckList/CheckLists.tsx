import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialStateWhenUnMounted } from '@modules/CheckListProductList';
import AddCheckList from '@components/checkList/AddCheckList';
import CheckListItem from '@components/checkList/CheckListItem';
import { getCheckLists } from '@apis/checkList.Api';
import type { CheckList } from '@apis/checkList.Api';
import ChecklistHeader from '@components/EmptyHeader';
interface CheckListsProps {}

const CheckLists: FunctionComponent<CheckListsProps> = () => {
  const [checkListItems, setCheckListItems] = useState<CheckList[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCheckListsData = async () => {
      const data = await getCheckLists();
      dispatch(setInitialStateWhenUnMounted());
      setCheckListItems(data);
    };
    setTimeout(() => getCheckListsData(), 100);
    return () => {};
  }, []);
  return (
    <>
      <ChecklistHeader title="장보기 내역" navigateRouter="" />
      <main
        className="grid w-full
    grid-cols-3 content-start bg-[white] p-5"
      >
        <AddCheckList />

        {checkListItems.map(checkList => {
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
      </main>
    </>
  );
};

export default CheckLists;
