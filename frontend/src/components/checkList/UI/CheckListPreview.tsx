import { FC } from 'react';

interface CheckListPreviewProps {
  status: boolean;
  productName: string;
}

const CheckListPreview: FC<CheckListPreviewProps> = props => {
  const { status, productName } = props;
  return (
    <>
      <div className="m-1 flex w-[20vw] items-center text-xs">
        <input
          type="checkbox"
          checked={status}
          className="h-3 w-3 rounded border-gray-400"
          readOnly
        />
        <span className="ml-2 truncate">{productName}</span>
      </div>
    </>
  );
};

export default CheckListPreview;
