import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomProducts } from '@modules/CheckListProductList';
interface CustomInputProps {}

const CustomInput: FC<CustomInputProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };
  const handelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue !== '') {
      console.log(inputValue);
      dispatch(
        addCustomProducts({
          id: -1,
          customProductName: inputValue,
          status: false,
        }),
      );
      setInputValue('');
    }
  };
  return (
    <>
      <div className="center container m-3 flex w-[86vw] items-center justify-center rounded border border-gray-300 border-black p-3 lg:py-0 ">
        <input
          value={inputValue}
          onChange={getInputValue}
          onKeyPress={handelInput}
          id="customInput"
          className="w-[100%] rounded border border-gray-600"
          type="text"
        />
      </div>
    </>
  );
};

export default CustomInput;
