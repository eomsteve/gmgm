import { FC } from 'react';
import { LogInUserREQ, logInApi } from '../../routers/APIs/userApi';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../modules/store';
import { setAuthToken,logInApiRedux } from '@modules/Auth'
import { clearAllGoodsList, getFavoriteItemStoreReduxLogin } from '@modules/FavoriteProductList'
import { useDispatch, useSelector } from 'react-redux';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const authToken = useSelector((state: RootState) => {
    console.log(state.persistedReducer.authTokenReducer.accessToken);
  });
  console.log(authToken);

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit');
    e.preventDefault();
    const logInFormData = new FormData(e.currentTarget);
    const logInform: LogInUserREQ = {
      email: logInFormData.get('email') as string,
      pwd: logInFormData.get('password') as string,
    };
    const logInRes: {accessToken : string, refreshToken : string} | string = await dispatch(logInApiRedux(
      logInform,
    )).unwrap();
    console.log(logInRes);
    
    if (typeof logInRes !== typeof "string") {
      dispatch(getFavoriteItemStoreReduxLogin())
      navigate('/');
    } else {
      alert('실패 : 이메일과 비밀번호를 확인해 주세요');
    }
  };
  return (
    <section className="flex min-h-[80vh] flex-col dark:bg-gray-900">
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div><img src="https://j7d108.p.ssafy.io/resource/logo.png" alt="" className='w-14 h-14' /></div>
            <h1 className="text-xl leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              로그인
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  id="Email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="email@address.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  name="password"
                  id="Password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center font-medium text-white"
              >
                로그인하기
              </button>
            </form>
            <div className="pt-4 text-center font-light text-gray-500 dark:text-gray-400">
              아직 회원이 아니신가요?{' '}
              <a href="/SignUp" className="font-medium text-blue-500">
                회원가입하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
