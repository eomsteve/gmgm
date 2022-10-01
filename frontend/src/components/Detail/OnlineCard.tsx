import { FC, useState } from 'react';
interface OnlineCardProps {}

const OnlineCard: FC<OnlineCardProps> = () => {
  return (
    <>
      <div className="my-5 w-full">
        <span className="text-lg">
          온라인 최저가
          <span className="ml-2 text-xs text-gray-500">
            선택한 상품의 온라인 최저가 구매 링크로 이동합니다.
          </span>
        </span>
        <div className="m-2 flex grid grid-cols-4 rounded border border-gray-300 p-3">
          <img src="http://placekitten.com/75/75" alt="" />
          <div className="col-span-3 flex flex-col px-3 text-[0.9rem]">
            <p>
              <span className="text-[1rem]">농심 신라면 120g 5입</span>의
            </p>
            <p>온라인 최저가는</p>
            <p>
              <span className="text-[1.2rem]">4600원</span> 입니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineCard;
