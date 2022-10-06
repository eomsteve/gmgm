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
  const [notModified, setNotModified] = useState<boolean>(true);
  const { checklistCustomItems } = useSelector((state: RootState) => {
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
          setNotModified(false);
        }}
      >
        {isEdit && (isEmpty && notModified) && <CustomBanner />}
      </div>
      {checklistCustomItems.map((product: CustomProduct, index : number) => {
        return (
          <div key={index}>

          <CheckListCard
            customProductName={product.customProductName}
            isEdit={isEdit}
            status={product.status}
            businessType={BusinessType}
            />
            </div>
        );
      })}
      {!isEdit && isEmpty && <div className="my-10 text-gray-500 text-sm">
      체크리스트가 비어 있어요.
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
