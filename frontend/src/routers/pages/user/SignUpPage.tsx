import React, { FunctionComponent } from 'react';
import SignUp from '@components/users/SignUpComponent';
import SignUpHeader from '@components/EmptyHeader';

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  return (
    <>
      <SignUpHeader title="회원가입" navigateRouter="" />
      <SignUp />
    </>
  );
};

export default SignUpPage;
