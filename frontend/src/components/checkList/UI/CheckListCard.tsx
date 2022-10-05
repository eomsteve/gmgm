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
          className="col-span-2 ml-4 h-[20px] w-[20px]"
          checked={isChecked}
          type="checkbox"
          id={customProductName || basicProductName}
        />
        <label
          className={`${customProductName ? 'col-span-6' : 'col-span-5'} flex items-center p-1 ${
            !isChecked ? '' : 'text-gray-500 line-through'
          }`}
          htmlFor={customProductName || basicProductName}
        >
          <span> {customProductName || basicProductName}</span>
        </label>
        { basicProductName && <div>
          <span className="col-span-1 flex justify-center truncate ">
            {priceGap &&priceGap > 0 ? (
              <Up width="1rem" height="2rem" />
            ) :priceGap && priceGap < 0 ? (
              <Down width="1rem" height="2rem" />
            ) : (
              <Equal width="1rem" height="2rem" />
            )}
          </span>
          <span
            className={`col-span-1 flex justify-center text-sm${
              priceGap && priceGap > 0 ? '' : ''
            }`}
          >
            {priceGap == 0 ? '' : priceGap}
          </span>
        </div>}
        <span className="col-span-3 mr-2 flex justify-end">{recentPrice}</span>
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
