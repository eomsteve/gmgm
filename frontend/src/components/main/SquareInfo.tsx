import { FC } from 'react';

interface SquareInfoProps {
  bgColor: string;
  textColor: string;
  gridSize: string;
  cpi ?: {value : number, researchDate:string},
  favoriteIndex?: {value: number, researchDate:string},
  news ?: {id: number, title: string, link: string, pubDate: string},
  gmgmIndex ?: {value: number, researchDate:string},
}

const SSquareInfo: FC<SquareInfoProps> = props => {
  const { bgColor, textColor, gridSize, cpi, favoriteIndex, news, gmgmIndex } = props;
  return (
    <>
      <div
        className={`${bgColor} ${textColor} ${gridSize} h-full w-full rounded-xl p-3`}
      >
        { cpi && <div><div>{cpi.value}</div>
        <div>{cpi.researchDate}</div></div>}
        { news && <div><div>{news.title}</div>
        <div>{news.pubDate}</div></div>}
        { favoriteIndex && <div><div>{favoriteIndex.value}</div>
        <div>{favoriteIndex.researchDate}</div></div>}
        { gmgmIndex && <div><div>{gmgmIndex.value}</div>
        <div>{gmgmIndex.researchDate}</div></div>}
      </div>
    </>
  );
};

export default SSquareInfo;
