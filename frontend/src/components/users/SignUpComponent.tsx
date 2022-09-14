import { FunctionComponent } from 'react';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <div className="bg-stone-100 flex min-h-screen flex-col">
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
          <h1 className="mb-8 text-center text-3xl">Sign up</h1>
          <input
            type="text"
            className="border-stone-200 mb-4 block w-full rounded border p-3"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            type="text"
            className="border-stone-200 mb-4 block w-full rounded border p-3"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            className="border-stone-200 mb-4 block w-full rounded border p-3"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            className="border-stone-200 mb-4 block w-full rounded border p-3"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="bg-[green] hover:bg-green-800 my-1 w-full rounded py-3 text-center text-white focus:outline-none"
          >
            Create Account
          </button>
          

          <div className="text-[grey] mt-4 text-center text-sm">
            By signing up, you agree to the
            <a
              className="border-[grey] text-stone-600 border-b no-underline"
              href="#"
            >
              Terms of Service
            </a>{' '}
            and
            <a
              className="border-stone-600 text-stone-600 border-b no-underline"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-stone-600 mt-6">
          Already have an account?
          <a
            className="border-[blue] text-[blue] border-b no-underline"
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
