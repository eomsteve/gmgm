import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeBasicProducts } from '@modules/CheckListProductList';
import type { BasicProduct } from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
import { ReactComponent as Delete} from '@src/assets/icons/itemDelete.svg'
interface SelectedAreaProps {
  isEdit: boolean;
  checklistId: string;
}

const SelectedArea: FC<SelectedAreaProps> = props => {
  const { isEdit, checklistId } = props;
  const navigate = useNavigate();
  const { checklistBasicItems } = useSelector((state: RootState) => {
    console.log(state, checklistId);
    return {
      checklistBasicItems:
        state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
    };
  });
  const dispatch = useDispatch();
  const removeList = (product: BasicProduct) => {
    dispatch(removeBasicProducts(product.basicProductId));
  };
  return (
    <>
      <div className="flex h-full w-full flex-col bg-[#b3d1e6]">
        <div className="my-3 mx-5 text-lg">
          장보기 목록
          <span className="ml-2 text-xs text-gray-500">
            품목을 선택하면 목록에서 제거할 수 있어요.
          </span>
        </div>
        <div className="flex h-full flex-wrap content-start items-start overflow-auto scroll-auto p-3">
          {checklistBasicItems &&
            checklistBasicItems.map((x: BasicProduct) => {
              return (
                <span
                  className="m-1 rounded-full bg-white px-2 py-1 text-sm flex items-center"
                  key={x.basicProductId}
                  onClick={() => {
                    removeList(x);
                  }}
                >
                  <span>{x.basicProductName}</span><span className="pl-1.5"><Delete width='0.5rem' height='0.5rem'/></span>
                </span>
              );
            })}
        </div>
        <span
          onClick={() => {
            navigate(`/checklists/${checklistId}`, {
              state: { isEdit, checklistId },
            });
          }}
          className="relate bottom-0 right-0 m-3 w-auto self-end rounded-full border border-gray-600 bg-white px-3 py-1"
        >
          다음 &gt;
        </span>
      </div>
    </>
  );
};

export default SelectedArea;
