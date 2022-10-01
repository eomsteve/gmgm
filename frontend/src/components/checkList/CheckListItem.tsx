import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Basket } from '../../assets/icons/basket.svg';
interface CheckListItemProps {
  checklistId: number;
  regDate: string;
}

const CheckListItem: FC<CheckListItemProps> = props => {
  const { checklistId, regDate } = props;
  const date = new Date(regDate);
  const navigate = useNavigate();

  // const handleOnClick = (e : React.MouseEvent<HTMLElement>) => {

  // }
  return (
    <>
      <div
        onClick={() => navigate(`/checklists/${checklistId}`)}
        className="checklist-item flex-column m-5 flex h-[130px] w-[90px] items-center justify-center rounded border border-gray-300"
      >
        <div className="flex flex-col items-center justify-center ">
          {/* <div className="text-[#428BC1] text-[2rem]"><FontAwesomeIcon icon={faBasketShopping} /></div> */}
          <div className="text-[2rem] text-[#428BC1]">
            <Basket width="2rem" height="2rem" />
          </div>
          <div className="text-[0.8rem] text-black">{`${
            date.getMonth() + 1
          }월 ${date.getDate()}일`}</div>
        </div>
      </div>
    </>
  );
};

export default CheckListItem;
