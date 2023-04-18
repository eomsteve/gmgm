import { FC } from 'react';
import { ReactComponent as Back } from '../assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  navigateRouter?: string;
  isDetail? : boolean;
  detailParams? : { from:string ,isEdit: boolean, checklistId?: string };
}



const Header: FC<HeaderProps> = props => {
  const { title, navigateRouter, isDetail, detailParams } = props;
  const navigate = useNavigate();
  
  return (
    <>
      <header className="center sticky top-0 z-40 grid h-16 grid-cols-8 justify-center border-b bg-white p-2 mx-5">
        <div className="flex items-center justify-center">
          {title === '홈' ? (
            <div className=''>
              <img src="/logo192.png" alt="" />
            </div>
          ) : (
            <div
              onClick={
                navigateRouter !== undefined
                  ? () => {
                    navigate(`/${navigateRouter}`);
                    }
                  : detailParams ? () => {
                      (isDetail && detailParams.from==='checkList') ? navigate(`/checklists/${detailParams?.checklistId}`, {
                        state : { isEdit : false ,
                                  checklistId : detailParams?.checklistId}
                      }) : navigate(-1) 
                      
                    } : () => navigate(-1) 
                  }>
              <Back width="1.2rem" height="1.2rem" />
            </div>
          )}
        </div>
        <span className="col-span-7 ml-2 flex items-center pt-1 font-dohyeon text-2xl">
          {title}
        </span>
      </header>
    </>
  );
};

export default Header;
