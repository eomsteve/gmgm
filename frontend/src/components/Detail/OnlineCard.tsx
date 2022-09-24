import { FC, useState} from 'react';
interface OnlineCardProps {
  
}
 
const OnlineCard: FC<OnlineCardProps> = () => {
  return (<>
    <div className="w-full shadow-md p-5">
      <p className="text-md font-bold my-1">온라인 최저가</p>
      <div className="flex">
        <img src="http://placekitten.com/75/75" alt="" />
        <div className="flex flex-col p-3 items-center">
          <p className="text-[0.9rem]">농심 신라면 120g 5입의 온라인 최저가는 4600원 입니다.</p>
        </div>
      </div>

    </div>
  </>);
}
 
export default OnlineCard;