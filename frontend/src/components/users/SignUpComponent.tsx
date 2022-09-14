import React, { useState, useCallback,FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const [name, setName] = useState<string>('')
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')
const [passwordConfirm, setPasswordConfirm] = useState<string>('')
const [date, setDate] = useState<string>('')
const [gender, setGender] = useState<string>('')

const [nameMessage, setNameMessage] = useState<string>('')
const [emailMessage, setEmailMessage] = useState<string>('')
const [passwordMessage, setPasswordMessage] = useState<string>('')
const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('')

const [isName, setIsName] = useState<boolean>(false)
const [isEmail, setIsEmail] = useState<boolean>(false)
const [isPassword, setIsPassword] = useState<boolean>(false)
const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)
const [isDate, setIsDate] = useState<boolean>(false)
const [isGender, setIsGender] = useState<boolean>(false)

const [isNameBlur, setIsNameBlur] = useState<boolean>(true)
const [isEmailBlur, setIsEmailBlur] = useState<boolean>(true)
const [isPasswordBlur, setIsPasswordBlur] = useState<boolean>(true)
const [isPasswordConfirmBlur, setIsPasswordConfirmBlur] = useState<boolean>(true)

const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
  if (e.target.value.length < 2 || e.target.value.length > 5) {
    setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
    setIsName(false)
  } else {
    setNameMessage('올바른 이름 형식입니다 :)')
    setIsName(true)
  }
}, [])

const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  const emailCurrent = e.target.value
  setEmail(emailCurrent)

  if (!emailRegex.test(emailCurrent)) {
    setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
    setIsEmail(false)
  } else {
    setEmailMessage('올바른 이메일 형식이에요 : )')
    setIsEmail(true)
  }
}, [])

  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )
  
  // 날짜 입력 확인
  const onChangeDatePicker = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
    const date = e.target.value;
    setDate(date)
    setIsDate(true)
  },[])


  // 성별 입력 확인
  const onChangeGender = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
    const gender = e.target.value;
    setGender(gender)
    setIsGender(true)
  },[])
// const onSubmit = useCallback(
//   async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try {
//       await axios
//         .post(REGISTER_USERS_URL, {
//           username: name,
//           password: password,
//           email: email,
//         })
//         .then((res) => {
//           console.log('response:', res)
//           if (res.status === 200) {
//             router.push('/sign_up/profile_start')
//           }
//         })
//     } catch (err) {
//       console.error(err)
//     }
//   },
//   [email, name, password, date, gender, router]
// )
  return (
    <form className="flex min-h-screen flex-col bg-gray-50" onSubmit={()=>{console.log('onSubmit')}}>
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
          <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">Sign up</h1>
          <input
            id="FullName"
            onChange={onChangeName}
            type="text"
            className={`my-2 block w-full rounded border p-3  ${isNameBlur ? 'border-stone-200' : `${isName  ? 'border-green-600' : 'border-red-500'}`}`}
            name="fullname"
            placeholder="Full Name"
            onBlur={()=>{setIsNameBlur(false)}}
            required
          />
          {name.length > 0 && <span className={`text-[0.7rem] ${isName ? 'text-blue-400' : 'text-gray-500'}`}>{nameMessage}</span>}
          <input
            id="Email"
            onChange={onChangeEmail}
            type="text"
            className={`my-2 block w-full rounded border p-3  ${isEmailBlur ? 'border-stone-200' : `${isEmail  ? 'border-green-600' : 'border-red-500'}`}`}
            name="email"
            placeholder="Email"
            onBlur={()=>{setIsEmailBlur(false)}}
            required
          />
          { (email.length > 0) && <span className={`text-[0.7rem] ${isEmail ? 'text-blue-400' : 'text-gray-500'}`}>{emailMessage}</span>}

          <input
            id="Password1"
            onChange={onChangePassword}
            type="password"
            className={`my-2 block w-full rounded border p-3  ${isPasswordBlur ? 'border-stone-200' : `${isPassword  ? 'border-green-600' : 'border-red-500'}`}`}
            name="password"
            placeholder="Password"
            required
          />
          {password.length > 0 && (
            <span className={`text-[0.7rem] ${isPassword ? 'text-blue-400' : 'text-gray-500'}`}>{passwordMessage}</span>
          )}
          <input
            id="Password2"
            onChange={onChangePasswordConfirm}
            type="password"
            className={`my-2 block w-full rounded border p-3  ${isPasswordConfirmBlur ? 'border-stone-200' : `${isPasswordConfirm  ? 'border-green-600' : 'border-red-500'}`}`}
            name="confirm_password"
            placeholder="Confirm Password"
            required
          />
          {passwordConfirm.length > 0 && (
            <span className={`text-[0.7rem] ${(isPasswordConfirm) ? 'text-blue-400' : 'text-gray-500'}`}>{passwordConfirmMessage}</span>
          )}
          <input
            id="Birth"
            type="date"
            onChange={onChangeDatePicker}
            data-placeholder="Birthday"
            required
            aria-required="true"
            className="my-2 block w-full rounded border border-stone-200 p-3 text-gray-400"
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
                onChange={onChangeGender}
              />
              <label
                className="flex text-gray-600 cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-stone-700"
                htmlFor="male"
              >
                Male
              </label>

            </div>
            <div >
              <input
                className="peer sr-only"
                type="radio"
                value="Female"
                name="gender"
                id="female"
                onChange={onChangeGender}
              />
              <label
                className="flex  cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:text-gray-600 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-stone-700"
                htmlFor="female"
              >
                Female
              </label>


            </div>
          </div>
          {/* input box end */}
          <button
            type="submit"
            className={`my-1 w-full rounded ${!(isName && isEmail && isPassword&& isGender && isPasswordConfirm && isDate) ? 'bg-gray-400' : 'bg-blue-400'} py-3 text-center text-white focus:outline-none`}
            disabled={!(isName && isEmail && isPassword && isPasswordConfirm && isDate && isGender)}
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
