import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
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
        className="checklist-item m-5 flex-column flex h-[130px] w-[90px] items-center justify-center shadow-md"
      >
        <div className="flex flex-col items-center justify-center ">
          <div className="text-[#428BC1] text-[2rem]"><FontAwesomeIcon icon={faBasketShopping} /></div>
          <div className="text-black text-[0.8rem]">{`${date.getMonth()+1}월 ${date.getDate()}일`}</div>
        </div>
      </div>
    </>
  );
};

export default CheckListItem;
