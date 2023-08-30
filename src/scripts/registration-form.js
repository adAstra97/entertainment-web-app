import workWithFirebase from "./firebase";

function openModal() {
   let user = document.querySelector('.user__img');
   let formBlock = document.querySelector('.entry');
   let closeBtns = formBlock.querySelectorAll('.close-btn');
   let loginBlock = formBlock.querySelector('.login-block');
   let signUpBlock = formBlock.querySelector('.sign-up-block');
   let linkToSignUp = formBlock.querySelector('#sign-up');
   let linkToLogin = formBlock.querySelector('#login');
   let inputsFromLoginBlock = loginBlock.querySelectorAll('input');
   let inputsFromSignUpBlock = signUpBlock.querySelectorAll('input');

   let password = signUpBlock.querySelector('input[type="password"]');
   let passwordRepeat = signUpBlock.querySelector('input[placeholder="Repeat password"]');
   let signUpFormBtn = signUpBlock.querySelector('#up-form');
   let loginFormBtn = loginBlock.querySelector('#login-form');


   user.addEventListener('click', openAuthForm);
   closeBtns.forEach(btn => {
      btn.addEventListener('click', closeAuthForm);
   });
   signUpFormBtn.addEventListener('click', () => {
      checkFields(inputsFromSignUpBlock)
   });
   loginFormBtn.addEventListener('click', () => {
      checkFields(inputsFromLoginBlock);
   });
   inputsFromSignUpBlock.forEach(input => {
      input.addEventListener('keydown', (event) => {
         if (event.focus) return;

         input.nextElementSibling.textContent = '';
         input.classList.remove('incorrect-input');
      });
   });
   inputsFromLoginBlock.forEach(input => {
      input.addEventListener('keydown', (event) => {
         if (event.focus) return;

         input.nextElementSibling.textContent = '';
         input.classList.remove('incorrect-input');
      });
   });
   linkToSignUp.addEventListener('click', openSignUpForm);
   linkToLogin.addEventListener('click', openLoginForm);
   formBlock.addEventListener('click', (event) => {
      if (event.target.closest('.entry__form')) return;
      closeAuthForm();
   });

   function openAuthForm() {
      formBlock.classList.remove('fade-out');
      formBlock.classList.add('fade-in');
      formBlock.classList.remove('hide');
      document.body.classList.add('noscroll');

   }

   function closeAuthForm() {
      formBlock.classList.remove('fade-in');
      formBlock.classList.add('fade-out');
      clearHints();
      setTimeout(() => {

         formBlock.classList.add('hide');
         document.body.classList.remove('noscroll');

         if (loginBlock.classList.contains('hide')) {
            signUpBlock.classList.add('hide');
            loginBlock.classList.remove('hide');
         }

         inputsFromLoginBlock.forEach(input => {
            input.value = '';
         });

         inputsFromSignUpBlock.forEach(input => {
            input.value = '';
         });
      }, 300);

   }

   function openSignUpForm() {
      clearHints();
      inputsFromLoginBlock.forEach(input => {
         input.value = '';
      });
      loginBlock.classList.add('hide');
      signUpBlock.classList.add('fade-in-left');
      signUpBlock.classList.remove('hide');
   }

   function openLoginForm() {
      clearHints();
      inputsFromSignUpBlock.forEach(input => {
         input.value = '';
      });
      signUpBlock.classList.add('hide');
      loginBlock.classList.add('fade-in-right');
      loginBlock.classList.remove('hide');
   }

   function checkFields(inputs) {
      inputs.forEach(input => {
         if (input.value === '') {
            input.nextElementSibling.textContent = 'Can’t be empty';
            input.classList.add('incorrect-input');
         }

         input.onclick = () => {
            input.nextElementSibling.textContent = '';
            input.classList.remove('incorrect-input');
         }
      });

      if (password.value !== passwordRepeat.value) {
         passwordRepeat.nextElementSibling.textContent = 'Don’t match';
      }
   }

   function clearHints() {
      let allHints = document.querySelectorAll('.field > span');
      allHints.forEach(hint => {
         hint.textContent = '';
         hint.previousElementSibling.classList.remove('incorrect-input');
      });
   }

   workWithFirebase();
}

openModal();