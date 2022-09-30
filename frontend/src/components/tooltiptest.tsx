import { FC } from 'react';
import 'flowbite';
import { Button,Tooltip } from 'flowbite-react';

interface TooltipProps {}

const TooltipComponent : FC<TooltipProps> = () => {
  return (
    <>
      <Tooltip content="안녕하세요 툴 팁 입니다.">
  <Button>
    Default tooltip
  </Button>
</Tooltip>
    </>
  );
};

export default TooltipComponent;
