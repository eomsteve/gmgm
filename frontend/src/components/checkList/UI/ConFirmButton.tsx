import { FC } from 'react';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';
import { updateCheckLists } from '@apis/checkList.Api';
// interface ConfirmButtonProps {
//   checkListId?: string;
//   checklistCustomItems: CustomProduct[];
//   checklistBasicItems: BasicProduct[];
// }

const ConfirmButton: FC = props => {
  // const { checkListId, checklistCustomItems, checklistBasicItems } = props;
  // const updateButton = async (
  //   checklistBasicItems: BasicProduct[],
  //   checklistCustomItems: CustomProduct[],
  //   checkListId?: string,
  // ) => {
  //   console.log(checkListId, checklistCustomItems, checklistBasicItems);

  //   if (typeof checkListId == 'string') {
  //     const data = updateCheckLists(
  //       checklistBasicItems,
  //       checklistCustomItems,
  //       checkListId,
  //     );
  //   }
  // };
  return (
    <>
      <button
        // onClick={() =>
        //   updateButton( checklistBasicItems,checklistCustomItems, checkListId)
        // }
        className="flex items-center justify-center"
      >
        <span className="m-3 rounded-full border-[1px] border-gray-600 p-1 px-3 text-xs font-normal">
          완료
        </span>
      </button>
    </>
  );
};

export default ConfirmButton;
