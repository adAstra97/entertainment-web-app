import renderSearchResult from "./search-results";
import { debounce } from "./debounce";

function showSearchResultsBookmarks(array, getData) {
   let arrayWithInfo = [];

   getData().then(data => {
      array.forEach(film => {
         let itemInfo = data.find(item => item.id === film);
         arrayWithInfo.push(itemInfo);
      });

      document.addEventListener('click', (event) => {
         let mark = event.target.closest('.card__bookmark');

         if (!mark) return;

         let card = event.target.closest('.card');
         let index = arrayWithInfo.findIndex(item => item.id === card.dataset.id);
         arrayWithInfo.splice(index, 1);
      });

      let searchDebounce = debounce(searchString => {
         getSearchResults(searchString);
      }, 700);

      let inputSearch = document.querySelector('#search-input');

      inputSearch.addEventListener('input', (event) => {
         searchDebounce(event);
      });
   });

   function getSearchResults(event) {

      if (document.querySelector('.bookmarked-movies__cards').children.length === 0
         && document.querySelector('.bookmarked-series__cards').children.length === 0
         && !document.querySelector('.no-bookmarked').classList.contains('hide')) {
         return;
      }

      let bookmarkedMoviesEl = document.querySelector('.bookmarked-movies');
      let bookmarkedSeriesEl = document.querySelector('.bookmarked-series');
      let resultSearch = document.querySelector('.result');
      let value = event.target.value;
      let filteredData = arrayWithInfo.filter(film => film.title.toLowerCase().includes(event.target.value.toLowerCase()));

      document.addEventListener('click', (event)=>{

         let mark = event.target.closest('.card__bookmark');
         if (!mark) return;
         let card = event.target.closest('.card');

         let index = filteredData.findIndex(item => item.id === card.dataset.id);
         filteredData.splice(index, 1);

         resultSearch.querySelector('.result__title').textContent = `
         Found ${filteredData.length} results for ‘${value}’
         `;
      });

      if (value.length > 0) {
         bookmarkedMoviesEl.classList.add('hide');
         bookmarkedSeriesEl.classList.add('hide');
         document.querySelector('.no-bookmarked').classList.add('hide');
         resultSearch.classList.remove('hide');

         resultSearch.querySelector('.result__title').textContent = `
            Found ${filteredData.length} results for ‘${value}’
         `;

         resultSearch.querySelector('.result__cards').innerHTML = '';

         renderSearchResult(filteredData);

      } else {

         if (document.querySelector('.bookmarked-movies__cards').children.length === 0 && document.querySelector('.bookmarked-series__cards').children.length == 0) {
            bookmarkedMoviesEl.classList.add('hide');
            bookmarkedSeriesEl.classList.add('hide');
            resultSearch.classList.add('hide');
            document.querySelector('.no-bookmarked').classList.remove('hide');
         } else if (document.querySelector('.bookmarked-movies__cards').children.length === 0) {
            bookmarkedMoviesEl.classList.add('hide');
            bookmarkedSeriesEl.classList.remove('hide');
            resultSearch.classList.add('hide');
         } else if (document.querySelector('.bookmarked-series__cards').children.length == 0) {
            bookmarkedMoviesEl.classList.remove('hide');
            bookmarkedSeriesEl.classList.add('hide');
            resultSearch.classList.add('hide');
         } else {
            bookmarkedMoviesEl.classList.remove('hide');
            bookmarkedSeriesEl.classList.remove('hide');
            resultSearch.classList.add('hide');
         }
      }
   }
}

export default showSearchResultsBookmarks;