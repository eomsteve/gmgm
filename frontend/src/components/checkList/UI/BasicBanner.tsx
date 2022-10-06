import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const EmptyCard: FC = () => {
  return (
    <>
      <div
        className="my-3 mx-5 flex 
        w-[86vw] flex-col items-center justify-center 
      rounded border border-gray-300 py-7 px-2 lg:py-0
        
      "
      >
        <h3>품목 추가</h3>
        <div className="my-2 text-[1.5rem]">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </>
  );
};

export default EmptyCard;
