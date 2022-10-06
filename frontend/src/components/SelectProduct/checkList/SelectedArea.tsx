import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeBasicProducts } from '@modules/CheckListProductList';
import type { BasicProduct } from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
import { ReactComponent as Delete } from '@src/assets/icons/itemDelete.svg';
interface SelectedAreaProps {
  isEdit: boolean;
  checklistId: string;
}

const SelectedArea: FC<SelectedAreaProps> = props => {
  const { isEdit, checklistId } = props;
  const navigate = useNavigate();
  const { checklistBasicItems } = useSelector((state: RootState) => {
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
          <span
            onClick={() => {
              navigate(`/checklists/${checklistId}`, {
                state: { isEdit, checklistId },
              });
            }}
            className="absolute right-5 rounded-full border border-gray-600 bg-white px-3 py-0.5"
          >
            다음 &gt;
          </span>
        </div>

        <div className="flex h-full flex-wrap content-start items-start overflow-auto scroll-auto p-3">
          {checklistBasicItems &&
            checklistBasicItems.map((x: BasicProduct) => {
              return (
                <span
                  className="m-1 flex items-center rounded-full bg-white px-2 py-1 text-sm"
                  key={x.basicProductId}
                  onClick={() => {
                    removeList(x);
                  }}
                >
                  <span>{x.basicProductName}</span>
                  <span className="pl-1.5">
                    <Delete width="0.5rem" height="0.5rem" />
                  </span>
                </span>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SelectedArea;
