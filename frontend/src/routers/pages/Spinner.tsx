import { FC } from 'react';

import { Grid } from  'react-loader-spinner'

interface SpinnerPageProps {
  
}
 
const SpinnerPage: FC<SpinnerPageProps> = () => {
  return (<>
    <main className="fixed h-screen w-full flex justify-center items-center bg-opacity-25 bg-slate-500">
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
  </>);
}
 
export default SpinnerPage;