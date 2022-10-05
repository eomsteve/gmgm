import { FC } from 'react';
import type { BasicProduct } from '@modules/CheckListProductList';
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
import BasicBanner from './UI/BasicBanner';
interface CheckListBasicItemsProps {
  BusinessType: string;
  isEmpty?: boolean;
  isEdit: boolean;
  checklistId?: string;
}

const CheckListBasicItems: FC<CheckListBasicItemsProps> = props => {
  const navigate = useNavigate();
  const { checklistBasicItems } = useSelector((state: RootState) => {
    return {
      checklistBasicItems:
        state.persistedReducer.CheckListProductsReducer.checklistBasicItems,
    };
  });

  const { isEdit, BusinessType, isEmpty, checklistId } = props;
  return (
    <>
      {isEdit && isEmpty && (
        <div
          onClick={() => {
            console.log(checklistId);

            navigate('/checklist/selection', {
              state: { isEdit, checklistId },
            });
          }}
        >
          <BasicBanner />
        </div>
      )}
      {!isEdit && isEmpty && (
        <div className="my-10 text-sm text-gray-500">
          체크리스트가 비어 있어요.
        </div>
      )}
      {checklistBasicItems.map((products: BasicProduct) => {
        return (
          <div key={products.basicProductId}>
            <CheckListCard
              basicProductName={products.basicProductName}
              isEdit={isEdit}
              status={products.status}
              productId={products.basicProductId}
              businessType={BusinessType}
              priceGap={
                BusinessType === 'm'
                  ? products.priceGapOff
                  : products.priceGapOn
              }
              recentPrice={
                BusinessType === 'm'
                  ? products.recentPriceOff
                  : products.recentPriceOn
              }
              checklistId={checklistId}
            />
          </div>
        );
      })}
      {isEdit && !isEmpty && checklistBasicItems && (
        <div
          onClick={() => {
            console.log(checklistId);

            navigate('/checklist/selection', {
              state: { isEdit, checklistId },
            });
          }}
        >
          <div className="m-0 text-[1.5rem]">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckListBasicItems;
