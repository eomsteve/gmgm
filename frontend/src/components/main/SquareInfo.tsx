import { FC } from 'react';

interface SquareInfoProps {
  bgColor: string;
  textColor: string;
  gridSize: string;
  isLogin : boolean;
  cpi ?: {value : number, researchDate:string},
  favoriteIndex?: {value: number, researchDate:string},
  news ?: {id: number, title: string, link: string, pubDate: string},
  gmgmIndex ?: {value: number, researchDate:string},
}

const SSquareInfo: FC<SquareInfoProps> = props => {
  const { bgColor, textColor, gridSize, cpi, favoriteIndex, news, gmgmIndex, isLogin } = props;
  return (
    <>
      <div
        className={`${bgColor} ${textColor} ${gridSize} h-full w-full rounded-xl p-3 flex justify-center items-center`}
      >
        { cpi && <div>
          <div className={`text-center text-2xl`}>소비자물가 지수</div>
          <div className={`text-center text-sm`}>{cpi.researchDate}</div>
          <div className={`text-center text-5xl font-semibold`}>{cpi.value}</div>
        </div>}
        { news && <div onClick={() => window.open(`${news.link}`, `_blank`)}>
          <div className={`text-slate-700 text-center text-2xl`}>물가 뉴스</div>
          <div className={`text-lg`}>{news.title}</div>
          <div className={`text-right text-sm`}>{news.pubDate}</div>
        </div>}
        { favoriteIndex  && isLogin && <div>
          <div className={`text-center text-2xl`}>즐겨찾기 지수</div>
          <div className={`text-center`}>{favoriteIndex.researchDate}</div>
          <div className={`text-center text-5xl font-semibold`}>{favoriteIndex.value}</div>
        </div>}
        { gmgmIndex && <div>
          <div className={`text-center text-2xl`}>가물가물 지수</div>
          <div className={`text-center`}>{gmgmIndex.researchDate}</div>
          <div className={`text-center text-5xl font-semibold`}>{gmgmIndex.value}</div>
        </div>}
      </div>
    </>
  );
};

export default SSquareInfo;
