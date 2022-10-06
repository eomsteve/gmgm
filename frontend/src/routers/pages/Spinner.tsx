import { FC } from 'react';

import { Grid } from 'react-loader-spinner';

interface SpinnerPageProps {}

const SpinnerPage: FC<SpinnerPageProps> = () => {
  return (
    <>
      <main className="fixed z-[999] flex h-screen w-full items-center justify-center bg-slate-500 bg-opacity-25">
        <Grid
          height="80"
          width="80"
          color="#009FEB"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </main>
    </>
  );
};

export default SpinnerPage;
