const pwd1 : HTMLInputElement | null = document.querySelector('#Password1'),
      pwd2 : HTMLInputElement | null = document.querySelector('#Password2'),
      email = document.querySelector('#Email'),
      name = document.querySelector('#FullName');


const pwd1Value = pwd1!.value;
const pwd2Value = pwd2!.value;

export const comparePassword = (pwd1Value : string, pwd2Value : string) : Boolean =>{
  return true;
}