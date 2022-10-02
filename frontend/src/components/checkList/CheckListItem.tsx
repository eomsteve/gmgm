import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import CheckListPreview from '@components/checkList/UI/CheckListPreview';
import { ReactComponent as Basket } from '../../assets/icons/basket.svg';
interface CheckListItemProps {
  checklistId: number;
  regDate: string;
  itemInfos: {
    productName: string;
    status: boolean;
  }[];
}

const CheckListItem: FC<CheckListItemProps> = props => {
  const { checklistId, regDate, itemInfos } = props;
  const date = new Date(regDate);
  const navigate = useNavigate();

  // const handleOnClick = (e : React.MouseEvent<HTMLElement>) => {

  // }
  return (
    <>
      <div
        onClick={() => navigate(`/checklists/${checklistId}`)}
        className="checklist-item flex-column m-3 flex h-36 justify-center rounded border border-gray-300 py-2"
      >
        <div className="grid grid-rows-5">
          <div className="flex items-center justify-center text-black">
            <div>
              <Basket width="1.1rem" height="1.1rem" />
            </div>
            <div className="ml-1">{`${
              date.getMonth() + 1
            }월 ${date.getDate()}일`}</div>
          </div>
          {itemInfos.map(itemInfo => {
            return (
              <div>
                <CheckListPreview
                  status={itemInfo.status}
                  productName={itemInfo.productName}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CheckListItem;
