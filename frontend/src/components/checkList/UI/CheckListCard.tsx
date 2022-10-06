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
import { ReactComponent as Equal } from '@src/assets/icons/equals.svg';
import { ReactComponent as Down } from '@src/assets/icons/down.svg';
import { ReactComponent as Up } from '@src/assets/icons/up.svg';

import { ReactComponent as Chart } from '../../../assets/icons/chart.svg';
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';

interface CheckListProps {
  isEdit: boolean;
  customProductName?: string;
  basicProductName?: string;
  status: boolean;
  productId?: number;
  businessType: string;
  recentPrice?: number;

  priceGap?: number;
  checklistId?: string;
}
const CheckListCard: FC<CheckListProps> = props => {
  const {
    customProductName,
    basicProductName,
    isEdit,
    status,
    businessType,
    productId,
    priceGap,
    recentPrice,
    checklistId
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
      <div className="center container m-2 grid w-[86vw] grid-cols-12 items-center rounded border border-gray-300 py-2 px-2 lg:py-0 ">
        <input
          disabled={isEdit}
          onChange={handleCheckState}
          className={`${isEdit ? 'bg-gray-300': ''} col-span-2 ml-4 h-[20px] w-[20px]`}
          checked={isChecked}
          type="checkbox"
          id={customProductName || basicProductName}
        />
        <label
          className={`${isEdit ? 'col-span-8 ' : 'col-span-4'} flex items-center p-1 ${basicProductName && basicProductName?.length < 5 ? '' : ' truncate'} ${
            !isChecked ? '' : 'text-gray-500 line-through'
          }`}
          htmlFor={customProductName || basicProductName}
        >
          <span> {customProductName || basicProductName}</span>
        </label>
        { isEdit ? '': basicProductName && 
        <div className="col-span-2">
          <span className="col-span-2 flex justify-center truncate ">
            {priceGap &&priceGap > 0 ? (
              <Up width="1rem" height="1rem" />
            ) :priceGap && priceGap < 0 ? (
              <Down width="1rem" height="1rem" />
            ) : (
              <Equal width="1rem" height="1rem" />
            )}
          </span>
          <span
            className={`col-span-1 flex justify-center text-[0.7rem] ${
              priceGap && priceGap > 0 ? '' : ''
            }`}
          >
            {priceGap == undefined ? '' : `${priceGap.toLocaleString()} 원`}
          </span>
        </div>}
        {!isEdit &&recentPrice && <span className={`col-span-3 mr-2 flex justify-end ${Math.round(recentPrice).toLocaleString().length < 5 ? '' : 'text-sm'}`}>{Math.round(recentPrice).toLocaleString() } 원</span>}
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
                    `/detail/product/${productId}/business/${businessType}`,{
                      state: { isEdit, from : 'checkList', checklistId },
                    }
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
