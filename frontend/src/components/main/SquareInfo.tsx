import { FC } from 'react';

interface SquareInfoProps {
  bgColor: string;
  textColor: string;
  gridSize: string;
}

const SSquareInfo: FC<SquareInfoProps> = props => {
  const { bgColor, textColor, gridSize } = props;
  return (
    <>
      <div
        className={`${bgColor} ${textColor} ${gridSize} h-full w-full rounded-xl p-3`}
      >
        안녕 우리는 Indices
      </div>
    </>
  );
};

export default SSquareInfo;
