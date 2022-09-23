import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const EmptyCard: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate('/favorite/selection');
        }}
        className="m-3 ml-3 flex 
        w-[90vw] flex-col items-center justify-center 
      border-black py-7 px-2 lg:py-0
        shadow-md
      "
      >
        <h3>품목 추가</h3>
        <div className="text-[1.5rem] m-0">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="text-sm">가격 비교 서비스를 사용할 수 있습니다🥰</div>
      </div>
    </>
  );
};

export default EmptyCard;
