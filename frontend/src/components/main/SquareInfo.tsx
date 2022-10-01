import { FC } from 'react';

interface SquareInfoProps {
  bgColor: string;
  textColor: string;
}

const SSquareInfo: FC<SquareInfoProps> = props => {
  const { bgColor, textColor } = props;
  return (
    <>
      <div
        className={`${bgColor} ${textColor} m-3 h-[40vw] w-[40vw] rounded-xl p-3`}
      >
        흰 글씨가 잘 안보일지도...
      </div>
    </>
  );
};

export default SSquareInfo;
