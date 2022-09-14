import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <form className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
          <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">Sign up</h1>
          <input
            id="FullName"
            type="text"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="fullname"
            placeholder="Full Name"
            required
          />

          <input
            id="Email"
            type="text"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="email"
            placeholder="Email"
            required
          />

          <input
            id="Password1"
            type="password"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="password"
            placeholder="Password"
            required
          />
          <input
            id="Password2"
            type="password"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="confirm_password"
            placeholder="Confirm Password"
            required
          />
          <input
            id="Birth"
            type="date"
            data-placeholder="Birthday"
            required
            aria-required="true"
            className="mb-4 block w-full rounded border border-stone-200 p-3 text-gray-400"
            name="birthday"
          />
          {/* gender selectors */}
          <div className="mx-auto mb-4 grid max-w-md grid-cols-2 gap-x-3 required">
            <div>
              <input
                className="peer sr-only"
                type="radio"
                value="Male"
                name="gender"
                id="male"
              />
              <label
                className="flex text-gray-600 cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-stone-700"
                htmlFor="male"
              >
                Male
              </label>

              {/* <div className="absolute top-5 right-3 hidden h-5 w-5 peer-checked:block">
                👍
              </div> */}
            </div>
            <div >
              <input
                className="peer sr-only"
                type="radio"
                value="Female"
                name="gender"
                id="female"
              />
              <label
                className="flex  cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:text-gray-600 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-stone-700"
                htmlFor="female"
              >
                Female
              </label>

              {/* <div className="absolute top-5 right-3 hidden h-5 w-5 peer-checked:block">
                  👎
                </div> */}
            </div>
          </div>
          {/* input box end */}
          <button
            type="submit"
            className="my-1 w-full rounded bg-green-400 py-3 text-center text-white hover:bg-green-800 focus:outline-none"
          >
            Create Account
          </button>

          <div className="mt-4 text-center text-sm text-[grey]">
            By signing up, you agree to the
            <a
              className="border-b border-[grey] text-stone-600 no-underline"
              href="#"
            >
              Terms of Service
            </a>{' '}
            and
            <a
              className="border-b border-stone-600 text-stone-600 no-underline"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-6 text-stone-600">
          Already have an account?
          <a
            className="text-blue-600 dark:text-primary-500 font-medium hover:underline"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </form>
  );
};

export default SignUp;
