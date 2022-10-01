import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  updateCustomProductStatus,
  updateBasicProductsStatus,
  removeBasicProducts,
  removeCustomProducts,
} from '@modules/CheckListProductList';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@modules/store';
import { atCheckList } from '@apis/detail';
import type {
  CustomProduct,
  BasicProduct,
} from '@modules/CheckListProductList';

import { ReactComponent as Chart } from '../../../assets/icons/chart.svg';
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';

interface CheckListProps {
  isEdit: boolean;
  customProductName?: string;
  basicProductName?: string;
  status: boolean;
  productId?: number;
  businessType: string;
}
const CheckListCard: FC<CheckListProps> = props => {
  const {
    customProductName,
    basicProductName,
    isEdit,
    status,
    businessType,
    productId,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { checklistCustomItems, checklistBasicItems } = useSelector(
    (state: RootState) => {
      // console.log(state);
      return {
        checklistCustomItems:
          state.persistedReducer.CheckListProductsReducer.checklistCustomItems,
        checklistBasicItems:
          state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
      };
    },
  );
  const handleCheckState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    if (basicProductName != undefined) {
      dispatch(updateBasicProductsStatus(e.target.id));
    } else {
      dispatch(updateCustomProductStatus(e.target.id));
    }
  };
  useEffect(() => {
    setIsChecked(status);
  }, []);


  return (
    <>
      <div className="center container m-2 grid w-[86vw] grid-cols-6 items-center rounded border border-gray-300 py-2 px-2 lg:py-0 ">
        <input
          disabled={isEdit}
          onChange={handleCheckState}
          className="ml-4 h-[20px] w-[20px]"
          checked={isChecked}
          type="checkbox"
          id={customProductName || basicProductName}
        />
        <label
          className={`col-span-3 flex items-center p-1 ${
            !isChecked ? '' : 'text-gray-500 line-through'
          }`}
          htmlFor={customProductName || basicProductName}
        >
          <span> {customProductName || basicProductName}</span>
        </label>
        <div
          onClick={() => {
            navigate('/');
          }}
          className="flex items-center justify-center"
        >
          {basicProductName && <span> 추세 </span>}
        </div>
        <div className="flex items-center justify-center">
          {basicProductName &&
            (isEdit ? (
              <span
                onClick={() => {
                  dispatch(removeBasicProducts(productId));
                }}
              >
                <Delete width="1.2rem" height="1.2rem" />
              </span>
            ) : (
              <span
                onClick={() => {
                  navigate(
                    `/detail/product/${productId}/business/${businessType}`,
                  );
                }}
              >
                <Chart width="1.2rem" height="1.2rem" />
              </span>
            ))}
          {customProductName && isEdit && (
            <span
              onClick={() => {
                dispatch(removeCustomProducts(customProductName));
              }}
            >
              <Delete width="1.2rem" height="1.2rem" />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckListCard;
