import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import './SquareInfo.css'
import { useNavigate } from 'react-router-dom';

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
  const [flip, setFlip] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${textColor} ${gridSize} flex justify-center items-center`}
      >
        { cpi &&
        <div className={`card h-full w-full rounded-xl ${flip ? `flip bg-[#F75F8E]` : `${bgColor}`}`}>
          <div className='text-end p-3' onClick={() => setFlip(!flip)}>
            { flip 
            ? <FontAwesomeIcon icon={faXmark} />
            : <FontAwesomeIcon icon={faPlus} />
            }
          </div>
          <div className={`front`} onClick={() => setFlip(!flip)}>
            <div className={`text-center text-2xl`}>소비자물가 지수</div>
            <div className={`text-center text-sm`}>{cpi.researchDate}</div>
            <div className={`text-center text-5xl font-semibold`}>{cpi.value}</div>
          </div>
          <div className='back' onClick={() => setFlip(!flip)}>
            <div className='px-2 antialiased'>각 가정이 <span>생활을 위해 구입하는 상품과 서비스</span>의 가격 변동을 측정하기 위해 <span>국가</span>에서 작성한 지수</div>
          </div>
        </div>
        }
        { news && <div onClick={() => window.open(`${news.link}`, `_blank`)} className={`h-full w-full p-2 rounded-xl ${bgColor}`}>
          <div className={`text-gray-900 text-center text-lg`}>물가 뉴스</div>
          <div className={`text-base leading-none`}>{news.title}</div>
          <div className={`text-right text-sm`}>{news.pubDate}</div>
        </div>}
        {favoriteIndex && ((favoriteIndex.value===-1) ? 
        (isLogin 
        ? <div className={`card h-full w-full rounded-xl ${bgColor}`}>
          <div className='text-end p-3' onClick={() => navigate('/favorite/selection')}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div onClick={() => navigate('/favorite/selection')}>
            <div className={`front text-center text-xl`}>즐겨찾기에<br></br>상품을 추가하여<br></br>지수를 만들어보세요</div>
          </div>
        </div>
        : <div className={`card h-full w-full rounded-xl ${flip ? `flip bg-[#FF9887]` : `${bgColor}`}`} onClick={() => navigate('/LogIn')}>
          <div className='front'>
            <div className={`text-center text-2xl`}>즐겨찾기 지수를<br></br>확인하려면<br></br>로그인하세요</div>
          </div>
        </div>
        ) : <div className={`card h-full w-full rounded-xl ${flip ? `flip bg-[#FF9887]` : `${bgColor}`}`}>
          <div className='text-end p-3' onClick={() => setFlip(!flip)}>
            { flip 
            ? <FontAwesomeIcon icon={faXmark} />
            : <FontAwesomeIcon icon={faPlus} />
            }
          </div>
          <div className='front' onClick={() => setFlip(!flip)}>
            <div className={`text-center text-2xl`}>즐겨찾기 지수</div>
            <div className={`text-center`}>{favoriteIndex.researchDate}</div>
            <div className={`text-center text-5xl font-semibold`}>{favoriteIndex.value}</div>
          </div>
          <div className='back' onClick={() => setFlip(!flip)}>
            <div className='px-2 antialiased'><span>즐겨찾기에 추가한 상품</span>의 가격 변동을 측정하기 위해 계산한 지수</div>
          </div>
        </div>
        )}
        { gmgmIndex &&
        <div className={`h-full w-full card rounded-xl ${flip ? `flip bg-[#457DC7]` : `${bgColor}`}`}>
          <div className='text-end p-3' onClick={() => setFlip(!flip)}>
            { flip 
            ? <FontAwesomeIcon icon={faXmark} />
            : <FontAwesomeIcon icon={faPlus} />
            }
          </div>
          <div className='front' onClick={() => setFlip(!flip)}>
            <div className={`text-center text-2xl`}>가물가물 지수</div>
            <div className={`text-center`}>{gmgmIndex.researchDate}</div>
            <div className={`text-center text-5xl font-semibold`}>{gmgmIndex.value}</div>
          </div>
          <div className='back' onClick={() => setFlip(!flip)}>
            <div className='px-2 antialiased'><span>가물가물에서 지정한 89개 품목</span>의 가격 변동을 측정하기 위해 계산한 지수</div>
          </div>
        </div>}
      </div>
    </>
  );
};

export default SSquareInfo;
