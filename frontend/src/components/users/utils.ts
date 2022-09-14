const pwd1 : HTMLInputElement | null = document.querySelector('#Password1'),
      pwd2 = document.querySelector('#Password2'),
      email = document.querySelector('#Email'),
      name = document.querySelector('#FullName');


const pwd1Value = pwd1!.value;

export const comparePassword = (pwd1 : string, pwd2 : string) : Boolean =>{
  return true;
}