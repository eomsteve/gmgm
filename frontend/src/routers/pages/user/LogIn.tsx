import { FC } from 'react';
import LogIn from '../../../components/users/LogInComponent';
import LogInHeader from '@components/EmptyHeader';

const LogInPage: FC = () => {
  return (
    <>
      <LogInHeader title="로그인" navigateRouter="" />
      <LogIn />
    </>
  );
};

export default LogInPage;
