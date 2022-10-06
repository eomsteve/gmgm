import { FC, useState, useEffect } from 'react';

interface SelectBoxProps {
  optionList: string[];
}

const businessData : {[key:string] : string} = {
  m : '대형마트',
  s : '슈퍼마켓',
  o : '온라인'
}


const EmptySelectBox: FC<SelectBoxProps> = props => {
  const { optionList } = props;
  const [options, setOption] = useState<string[]>(['m', 's', 'o']);
  return (
    <>
      <select
        // 여기 props 로 받아와야함.
        defaultValue="m"
        name="mySelectBox"
        className="form-select form-select-sm
    m-3
    block
    w-[20vw]
    appearance-none
    rounded
    border
    border-solid
    border-gray-300
    bg-white bg-clip-padding bg-no-repeat
    px-2 py-1 text-sm
    font-normal
    text-gray-700
    transition
    ease-in-out
    focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        aria-label=".form-select-sm example"
      >
        {options &&
          options.map((option, index) => (
            <option value={option} key={index}>
              {businessData[option]}
            </option>
          ))}
      </select>
    </>
  );
};

export default EmptySelectBox;
