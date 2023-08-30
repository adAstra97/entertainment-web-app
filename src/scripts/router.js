import createPreloader from "./preloader";

document.addEventListener('click', (event) => {
   if (event.target.closest('.menu__link')) {
      route(event);
      handleLocation();
   }
   event.preventDefault();
});

const route = (event) => {
   window.history.pushState({}, '', event.target.closest('.menu__link').href);
};

const routers = {
   '/' : 'home.js',
   '/movies' : 'movies.js',
   '/tv-series' : 'tv-series.js',
   '/bookmarks' : 'bookmarks.js',
};

const handleLocation = async () => {
   const path = window.location.pathname;
   document.querySelector('.main').innerHTML = createPreloader();
   document.body.classList.add('noscroll');

   if (path in routers) {

      document.querySelectorAll('.menu__link').forEach(link => {
         link.classList.remove('active');
      });
      document.querySelector(`[href=".${path}"]`).classList.add('active');

      setTimeout(() => {
         import(`./pages/${routers[path]}`)
         .then(data => {
            document.querySelector('.preloader').outerHTML = '';

            data.default();
            setTimeout(() => {
               document.body.classList.remove('noscroll');
            }, 100);
         })
      }, 500);
   } else {
      setTimeout(() => {
         import(`./pages/404`)
         .then(data => {
            document.querySelector('.preloader').outerHTML = '';
            data.default();
            document.querySelectorAll('.menu__link').forEach(link => {
               link.classList.remove('active');
            });
         });
      }, 500);
   }
};
window.onpopstate = handleLocation;
window.route = route;
handleLocation();
