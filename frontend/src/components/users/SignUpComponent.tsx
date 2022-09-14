import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
          <h1 className="mb-8 text-center text-3xl">Sign up</h1>
          <input
            id="FullName"
            type="text"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            id="Email"
            type="text"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="email"
            placeholder="Email"
          />

          <input
            id="Password1"
            type="password"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="password"
            placeholder="Password"
          />
          <input
            id="Password2"
            type="password"
            className="mb-4 block w-full rounded border border-stone-200 p-3"
            name="confirm_password"
            placeholder="Confirm Password"
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
                className="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:bg-blue-400"
                htmlFor="male"
              >
                Male
              </label>

              {/* <div className="absolute top-5 right-3 hidden h-5 w-5 peer-checked:block">
                👍
              </div> */}
            </div>
            <div>
              <input
                className="peer sr-only"
                type="radio"
                value="Female"
                name="gender"
                id="female"
              />
              <label
                className="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:text-gray-600 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:bg-blue-400"
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
            className="my-1 w-full rounded bg-[green] py-3 text-center text-white hover:bg-green-800 focus:outline-none"
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
            className="border-b border-[blue] text-[blue] no-underline"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
