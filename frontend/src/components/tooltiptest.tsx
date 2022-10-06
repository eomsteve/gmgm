import { FC } from 'react';
import 'flowbite';
import { Button, Tooltip } from 'flowbite-react';
import { ReactComponent as Equal } from '@src/assets/icons/equals.svg';
import { ReactComponent as Down } from '@src/assets/icons/down.svg';
import { ReactComponent as Up } from '@src/assets/icons/up.svg';
import { ReactComponent as TooltipQuestion } from '@src/assets/icons/tooltip-question-v2.svg';
interface TooltipProps {
}
const TooltipComponent: FC<TooltipProps> = () => {
  return (
    <>
      <Tooltip
        placement="auto"
        trigger="hover"
        style="light"
        content={
          <div>
            <ul>
              <li className="flex items-center">
                <Up className="mx-1" width="1rem" height="2rem" /> : 2주전에
                비해 가격이 증가했어요.
              </li>
              <li className="flex items-center">
                <Equal className="mx-1" width="1rem" height="2rem" />
                <span> : 2주전과 가격이 동일해요.</span>
              </li>
              <li className="flex items-center">
                <Down className="mx-1" width="1rem" height="2rem" /> : 2주전에
                비해 가격이 감소했어요.
              </li>
            </ul>
          </div>
        }
      >
        <TooltipQuestion width="1.2rem" height="1.2rem" color="black" />
      </Tooltip>
      
    </>
  );
};

export default TooltipComponent;
