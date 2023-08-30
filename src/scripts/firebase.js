import { initializeApp } from 'firebase/app';
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   setPersistence,
   browserLocalPersistence,
   onAuthStateChanged,
   signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, update } from 'firebase/database';
import changeStatusBookmarks from './films-mark';
import pushNotify from './notification';
import swal from 'sweetalert';
import createPreloader from './preloader';

function workWithFirebase() {
   const firebaseConfig = {
      apiKey: 'AIzaSyAyk3yUjIKhmVqLpjY84zkKBufwm6gSLI4',
      authDomain: 'movies-app-8538c.firebaseapp.com',
      databaseURL: 'https://movies-app-8538c-default-rtdb.firebaseio.com',
      projectId: 'movies-app-8538c',
      storageBucket: 'movies-app-8538c.appspot.com',
      messagingSenderId: '122143957193',
      appId: '1:122143957193:web:56bd71c13cf2dd2ee22d18',
      measurementId: 'G-WBMNE8R0LG',
   };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth();
   const database = getDatabase(app);

   let menuLinks = document.querySelectorAll('.menu__item');
   let userEl = document.querySelector('.user__img');
   let logoutBtn = document.querySelector('.user__log-out');
   let formBlock = document.querySelector('.entry');
   let loginBlock = formBlock.querySelector('.login-block');
   let signUpBlock = formBlock.querySelector('.sign-up-block');

   let loginFormBtn = loginBlock.querySelector('#login-form');
   let signUpFormBtn = signUpBlock.querySelector('#up-form');

   signUpFormBtn.addEventListener('click', signUpFormHandler);
   loginFormBtn.addEventListener('click', loginFormHandler);
   logoutBtn.addEventListener('click', askQuestionExitHandler);

   onAuthStateChanged(auth, (user) => {
      if (user) {
         // User is signed in
         menuLinks[menuLinks.length - 1].classList.remove('hide');
         logoutBtn.classList.remove('hide');
         document.body.classList.remove('noscroll');

         userEl.addEventListener('click', () => {
            formBlock.classList.add('hide');
            document.body.classList.remove('noscroll');
         });
         document.removeEventListener('click', pushNotify);
         document.addEventListener('click', changeStatusBookmarks);
         document.addEventListener('click', (event) => {
            let mark = event.target.closest('.card__bookmark');
            if (!mark) return;
            updateBookmarks(user.uid);
            getBookmarks(user.uid);
         });

         userEl.classList.add('login-user');
      } else {
         // User is signed out
         menuLinks[menuLinks.length - 1].classList.add('hide');
         logoutBtn.classList.add('hide');

         document.addEventListener('click', pushNotify);
         document.removeEventListener('click', changeStatusBookmarks);


         userEl.addEventListener('click', () => {
            formBlock.classList.remove('hide');
            document.body.classList.add('noscroll');
         });
         userEl.classList.remove('login-user');
      }
   });

   function signUpFormHandler() {
      let email = signUpBlock.querySelector('input[type="email"]');
      let password = signUpBlock.querySelector('input[type="password"]');
      let passwordRepeat = signUpBlock.querySelector(
         'input[placeholder="Repeat password"]'
      );
      let bookmarkedMovies = [];
      let bookmarkedSeries = [];

      if (
         email.value !== '' &&
         password.value !== '' &&
         passwordRepeat.value !== '' &&
         password.value === passwordRepeat.value
      ) {
         createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
               // Signed in
               const user = userCredential.user;
               document.body.classList.add('noscroll');

               set(ref(database, 'users/' + user.uid), {
                  email: email.value,
                  password: password.value,
                  bookmarkedMovies: JSON.stringify(bookmarkedMovies),
                  bookmarkedSeries: JSON.stringify(bookmarkedSeries),
               })
                  .then(() => {
                     // Data saved successfully!
                     renderMainPage();
                     signUpBlock.querySelectorAll('input').forEach((input) => {
                        input.value = '';
                     });
                     formBlock.classList.add('hide');
                     loginBlock.classList.remove('hide');
                     signUpBlock.classList.add('hide');
                     swal({
                        title: 'Welcome!',
                        text: 'Account created successfully!',
                        icon: 'success',
                     });
                  })
                  .catch((error) => {
                     // The write failed...
                     showModalErrorWindow(error);
                  });
            })
            .catch((error) => {
               showModalErrorWindow(error);
            });
      }
   }

   function loginFormHandler() {
      let email = loginBlock.querySelector('input[type="email"]');
      let password = loginBlock.querySelector('input[type="password"]');

      if (email.value !== '' && password.value !== '') {
         setPersistence(auth, browserLocalPersistence)
            .then(() => {
               signInWithEmailAndPassword(auth, email.value, password.value)
                  .then((userCredential) => {
                     // Signed in
                     const user = userCredential.user;
                     let lgDate = new Date();

                     document.body.classList.add('noscroll');
                     getBookmarks(user.uid);
                     update(ref(database, 'users/' + user.uid), {
                        last_login: lgDate,
                     })
                        .then(() => {
                           // Data saved successfully!
                           swal({
                              title: 'Welcome back!',
                              text: 'Glad to see you again',
                              icon: 'success',
                           });
                           renderMainPage();
                           loginBlock.querySelectorAll('input').forEach((input) => {
                              input.value = '';
                           });
                           formBlock.classList.add('hide');
                        })
                        .catch((error) => {
                           // The write failed...
                           showModalErrorWindow(error);
                        });
                  })
                  .catch((error) => {
                     showModalErrorWindow(error);
                  });
            })
            .catch((error) => {
               showModalErrorWindow(error);
            });
      }
   }

   function getBookmarks(id) {
      get(ref(database, 'users/' + id)).then((snapshot) => {
         if (snapshot.exists()) {
            localStorage.setItem(
               'bookmarkedMovies',
               snapshot.val().bookmarkedMovies
            );
            localStorage.setItem(
               'bookmarkedSeries',
               snapshot.val().bookmarkedSeries
            );
         } else {
            alert('Data doesn`t found in database');
         }
      })
      .catch((error) => {
         return;
      });
   }

   function updateBookmarks(id) {
      update(ref(database, 'users/' + id), {
         bookmarkedMovies: localStorage.getItem('bookmarkedMovies'),
         bookmarkedSeries: localStorage.getItem('bookmarkedSeries'),
      })
      .catch((error) => {
         return;
      });
   }

   function logoutHandler() {
      signOut(auth)
         .then(() => {
            localStorage.removeItem('bookmarkedSeries');
            localStorage.removeItem('bookmarkedMovies');

            renderMainPage();
         })
         .catch((error) => {
            showModalErrorWindow(error);
         });
   }

   function showModalErrorWindow(error) {
      let errorMessage = error.message;

      swal({
         title: 'Something went wrong..',
         text: errorMessage,
         icon: 'error',
         closeOnEsc: true,
         dangerMode: true,
         timer: 3000,
      });
   }

   function askQuestionExitHandler() {
      swal({
         title: 'Do you want to exit?',
         buttons: {
            cancel: true,
            exit: {
               text: 'Bye',
            },
         },
      }).then(value => {
         if (value === "exit") {
            logoutHandler();
         } else {
            return;
         }
      })
   }

   function renderMainPage() {
      document.querySelector('.main').innerHTML = createPreloader();
      document.body.classList.add('noscroll');

      setTimeout(() => {
         import(`./pages/home`)
         .then(data => {
            document.querySelector('.preloader').outerHTML = '';
            data.default();
            history.pushState(null, null, '/');
            document.querySelectorAll('.menu__link').forEach(link => {
               link.classList.remove('active');
            });
            document.querySelector(`[href="./"]`).classList.add('active');
            setTimeout(() => {
               document.body.classList.remove('noscroll');
            }, 100);
         });
      }, 500);
   }
}

export default workWithFirebase;
