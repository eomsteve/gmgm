import { FC, useState, useEffect } from 'react';
import type { CustomProduct } from '@modules/CheckListProductList';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInitialState,
  setInitialStateWhenUnMounted,
} from '@modules/CheckListProductList';
import type { RootState } from '@modules/store';
import CheckListCard from './UI/CheckListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomBanner from './UI/CustomBanner';
import CustomInput from './UI/InputCustom';

interface CheckListCustomItemsProps {
  BusinessType: string;
  isEmpty?: boolean;
  isEdit: boolean;
  checklistId?: string;
}

const CheckListCustomItems: FC<CheckListCustomItemsProps> = props => {
  const navigate = useNavigate();
  const [isCustom, setIsCustom] = useState<boolean>();
  const { checklistCustomItems } = useSelector((state: RootState) => {
    console.log(state);
    return {
      checklistCustomItems:
        state.persistedReducer.CheckListProductsReducer.checklistCustomItems,
      checklistBasicItems:
        state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
    };
  });
  const { isEdit, BusinessType, isEmpty, checklistId } = props;
  return (
    <>
      <div
        onClick={() => {
          setIsCustom(true);
        }}
      >
        {isEdit && isEmpty && <CustomBanner />}
      </div>
      {checklistCustomItems.map((product: CustomProduct) => {
        return (
          <CheckListCard
            customProductName={product.customProductName}
            isEdit={isEdit}
            status={product.status}
            businessType={BusinessType}
          />
        );
      })}
      {!isEdit && isEmpty && <div>
      비어있습니다.
    </div>}
      {isEdit && !isEmpty && (
        <div
          onClick={() => {
            setIsCustom(true);
          }}
          className="m-0 text-[1.5rem]"
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
      {isCustom && isEdit && <CustomInput />}
    </>
  );
};

export default CheckListCustomItems;
