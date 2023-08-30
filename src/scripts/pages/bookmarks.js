import createInput from "../search-field";
import createResultEl from '../results-el';
import showSearchResultsBookmarks from "../search-bookmarks";

function createBookmarksPage() {
   createInput('Search for bookmarked shows');

   let dataSeries = JSON.parse(localStorage.getItem('bookmarkedSeries'));
   let dataMovies = JSON.parse(localStorage.getItem('bookmarkedMovies'));
   let dataAllTypes = [];

   if (dataSeries && dataMovies) {
      dataAllTypes = [...dataSeries, ...dataMovies];
   }

   //movies
   let bookmarkedMovies = document.createElement('div');
   bookmarkedMovies.className = 'bookmarked-movies';
   bookmarkedMovies.innerHTML = `
   <h2 class="bookmarked-movies__title">Bookmarked Movies</h2>
   <div class="bookmarked-movies__cards"></div>
   `;

   document.querySelector('.main').append(bookmarkedMovies);

   if (!dataMovies || dataMovies.length === 0) {
      bookmarkedMovies.classList.add('hide');
   } else {
      bookmarkedMovies.classList.remove('hide');
      renderBookmarkedMovies();
   }

   //series
   let bookmarkedSeries = document.createElement('div');
   bookmarkedSeries.className = 'bookmarked-series';
   bookmarkedSeries.innerHTML = `
   <h2 class="bookmarked-series__title">Bookmarked TV Series</h2>
   <div class="bookmarked-series__cards"></div>
   `;

   document.querySelector('.main').append(bookmarkedSeries);

   if (!dataSeries || dataSeries.length === 0) {
      bookmarkedSeries.classList.add('hide');
   } else {
      bookmarkedSeries.classList.remove('hide');
      renderBookmarkedSeries();
   }

   //no bookmarks
   let noBookmarked = document.createElement('div');
   noBookmarked.className = 'no-bookmarked';
   noBookmarked.innerText = `No bookmarked movies & TV series`;

   document.querySelector('.main').append(noBookmarked);

   if (dataMovies && dataMovies.length > 0
      || dataSeries && dataSeries.length > 0) {
      noBookmarked.classList.add('hide');
   }

   async function getData() {
      try {
         let response = await fetch('../data.json');
         let data = await response.json();

         return data;
      } catch (error) {
         console.log(error);
      }
   }

   function renderBookmarkedMovies() {
      getData().then(data => {
         dataMovies.forEach(movie => {
            let moviesInfo = data.find(item => item.id === movie);
            let moviesCard = `
            <div class="card-wrapper">
               <div class="card card--sm" data-id=${moviesInfo.id}>
                  <div class="card__bookmark card__bookmark--sm bookmarked">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle opacity="0.500647" cx="16" cy="16" r="16" fill="#10141E"/>
                        <path d="M20.7112 9.771L20.7215 9.77548L20.7319 9.77965C20.7992 9.80657 20.8386 9.84049 20.8705 9.88692C20.9032 9.93458 20.9167 9.97786 20.9167 10.0364V21.9636C20.9167 22.0221 20.9032 22.0654 20.8705 22.1131C20.8386 22.1595 20.7992 22.1934 20.7319 22.2203L20.7237 22.2236L20.7156 22.2271C20.7107 22.2292 20.6807 22.2407 20.6094 22.2407C20.5085 22.2407 20.4397 22.2142 20.3686 22.15L16.3572 18.2346L15.8333 17.7233L15.3095 18.2346L11.2975 22.1505C11.2129 22.2276 11.1421 22.25 11.0573 22.25C11.02 22.25 10.9882 22.2433 10.9555 22.229L10.9452 22.2245L10.9347 22.2203C10.8674 22.1934 10.8281 22.1595 10.7962 22.1131C10.7635 22.0654 10.75 22.0221 10.75 21.9636V10.0364C10.75 9.97786 10.7635 9.93458 10.7962 9.88692C10.8281 9.84049 10.8674 9.80657 10.9347 9.77965L10.9452 9.77548L10.9555 9.771C10.9882 9.75674 11.02 9.75 11.0573 9.75H20.6094C20.6466 9.75 20.6784 9.75674 20.7112 9.771Z" stroke="white" stroke-width="1.5"/>
                     </svg>
                  </div>
                  <div class="card__img">
                     <picture>
                        <source
                           media="(min-width: 992px)"
                           srcset="${moviesInfo.thumbnail.regular.large}">
                        <source
                           media="(min-width: 568px)"
                           srcset='${moviesInfo.thumbnail.regular.medium}'>
                        <source
                           media="(min-width: 319px)"
                           srcset='${moviesInfo.thumbnail.regular.small}'>
                        <img src="${moviesInfo.thumbnail.regular.small}" alt="Film">
                     </picture>
                  </div>
                  <div class="card__hovered">
                     <button class="card__btn card__btn--sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM21 14.5L12 8V21L21 14.5Z" fill="white"/>
                        </svg>
                        <span>Play</span>
                     </button>
                  </div>
               </div>
               <div class="card__info card__info--sm">
                  <div class="card__info--top card__info-top--sm">
                     <span>${moviesInfo.year}</span>
                     <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                        <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white"/>
                     </svg>
                     <div style="display: flex; align-items: center; gap: 6px;">
                        ${moviesInfo.category === 'Movie' ? `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                           <path opacity="0.75" fill-rule="evenodd" clip-rule="evenodd" d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6ZM10.8 1.644V2.4H9.6V1.2H10.356C10.4738 1.2 10.5867 1.24678 10.67 1.33004C10.7532 1.41331 10.8 1.52624 10.8 1.644ZM2.4 1.2H1.644C1.52624 1.2 1.41331 1.24678 1.33004 1.33004C1.24678 1.41331 1.2 1.52624 1.2 1.644V2.4H2.4V1.2ZM1.2 10.356V9.6H2.4V10.8H1.644C1.52624 10.8 1.41331 10.7532 1.33004 10.67C1.24678 10.5867 1.2 10.4738 1.2 10.356ZM10.356 10.8C10.6012 10.8 10.8 10.6012 10.8 10.356V9.6H9.6V10.8H10.356Z" fill="white"/>
                        </svg>` :
                        `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                           <path opacity="0.75" fill-rule="evenodd" clip-rule="evenodd" d="M5.448 2.68865H12V12H0V2.68865H2.952L1.332 0.72163L2.268 0.0174588L4.2 2.3453L6.132 0L7.068 0.72163L5.448 2.68865ZM1.2 3.85257V10.8361H7.2V3.85257H1.2ZM10.2 8.50824H9V7.34433H10.2V8.50824ZM9 6.18041H10.2V5.01649H9V6.18041Z" fill="white"/>
                        </svg>`}
                        <span class="type">${moviesInfo.category}</span>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                        <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white"/>
                     </svg>
                     <span>${moviesInfo.rating}</span>
                  </div>
                  <h3 class="card__title card__title--sm">${moviesInfo.title}</h3>
               </div>
            </div>
            `;
            document.querySelector('.bookmarked-movies__cards').insertAdjacentHTML('beforeend', moviesCard);
         });
      });
   }

   function renderBookmarkedSeries() {
      getData().then(data => {
         dataSeries.forEach(series => {
            let seriesInfo = data.find(item => item.id === series);
            let seriesCard = `
            <div class="card-wrapper">
               <div class="card card--sm" data-id=${seriesInfo.id}>
                  <div class="card__bookmark card__bookmark--sm bookmarked">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle opacity="0.500647" cx="16" cy="16" r="16" fill="#10141E"/>
                        <path d="M20.7112 9.771L20.7215 9.77548L20.7319 9.77965C20.7992 9.80657 20.8386 9.84049 20.8705 9.88692C20.9032 9.93458 20.9167 9.97786 20.9167 10.0364V21.9636C20.9167 22.0221 20.9032 22.0654 20.8705 22.1131C20.8386 22.1595 20.7992 22.1934 20.7319 22.2203L20.7237 22.2236L20.7156 22.2271C20.7107 22.2292 20.6807 22.2407 20.6094 22.2407C20.5085 22.2407 20.4397 22.2142 20.3686 22.15L16.3572 18.2346L15.8333 17.7233L15.3095 18.2346L11.2975 22.1505C11.2129 22.2276 11.1421 22.25 11.0573 22.25C11.02 22.25 10.9882 22.2433 10.9555 22.229L10.9452 22.2245L10.9347 22.2203C10.8674 22.1934 10.8281 22.1595 10.7962 22.1131C10.7635 22.0654 10.75 22.0221 10.75 21.9636V10.0364C10.75 9.97786 10.7635 9.93458 10.7962 9.88692C10.8281 9.84049 10.8674 9.80657 10.9347 9.77965L10.9452 9.77548L10.9555 9.771C10.9882 9.75674 11.02 9.75 11.0573 9.75H20.6094C20.6466 9.75 20.6784 9.75674 20.7112 9.771Z" stroke="white" stroke-width="1.5"/>
                     </svg>
                  </div>
                  <div class="card__img">
                     <picture>
                        <source
                           media="(min-width: 992px)"
                           srcset="${seriesInfo.thumbnail.regular.large}">
                        <source
                           media="(min-width: 568px)"
                           srcset='${seriesInfo.thumbnail.regular.medium}'>
                        <source
                           media="(min-width: 319px)"
                           srcset='${seriesInfo.thumbnail.regular.small}'>
                        <img src="${seriesInfo.thumbnail.regular.small}" alt="Film">
                     </picture>
                  </div>
                  <div class="card__hovered">
                     <button class="card__btn card__btn--sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM21 14.5L12 8V21L21 14.5Z" fill="white"/>
                        </svg>
                        <span>Play</span>
                     </button>
                  </div>
               </div>
               <div class="card__info card__info--sm">
                  <div class="card__info--top card__info-top--sm">
                     <span>${seriesInfo.year}</span>
                     <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                        <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white"/>
                     </svg>
                     <div style="display: flex; align-items: center; gap: 6px;">
                        ${seriesInfo.category === 'Movie' ? `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                           <path opacity="0.75" fill-rule="evenodd" clip-rule="evenodd" d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6ZM10.8 1.644V2.4H9.6V1.2H10.356C10.4738 1.2 10.5867 1.24678 10.67 1.33004C10.7532 1.41331 10.8 1.52624 10.8 1.644ZM2.4 1.2H1.644C1.52624 1.2 1.41331 1.24678 1.33004 1.33004C1.24678 1.41331 1.2 1.52624 1.2 1.644V2.4H2.4V1.2ZM1.2 10.356V9.6H2.4V10.8H1.644C1.52624 10.8 1.41331 10.7532 1.33004 10.67C1.24678 10.5867 1.2 10.4738 1.2 10.356ZM10.356 10.8C10.6012 10.8 10.8 10.6012 10.8 10.356V9.6H9.6V10.8H10.356Z" fill="white"/>
                        </svg>` :
                        `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                           <path opacity="0.75" fill-rule="evenodd" clip-rule="evenodd" d="M5.448 2.68865H12V12H0V2.68865H2.952L1.332 0.72163L2.268 0.0174588L4.2 2.3453L6.132 0L7.068 0.72163L5.448 2.68865ZM1.2 3.85257V10.8361H7.2V3.85257H1.2ZM10.2 8.50824H9V7.34433H10.2V8.50824ZM9 6.18041H10.2V5.01649H9V6.18041Z" fill="white"/>
                        </svg>`}
                        <span class="type">${seriesInfo.category}</span>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                        <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white"/>
                     </svg>
                     <span>${seriesInfo.rating}</span>
                  </div>
                  <h3 class="card__title card__title--sm">${seriesInfo.title}</h3>
               </div>
            </div>
            `;
            document.querySelector('.bookmarked-series__cards').insertAdjacentHTML('beforeend', seriesCard);
         });
      });
   }
   createResultEl();
   showSearchResultsBookmarks(dataAllTypes, getData);
}

export default createBookmarksPage;