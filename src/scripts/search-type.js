import renderSearchResult from "./search-results";
import { debounce } from "./debounce";

function showSearchResultsByType(type, section) {

   let searchDebounce = debounce(searchString => {
      getSearchData(searchString);
   }, 700);

   let inputSearch = document.querySelector('#search-input');
   inputSearch.addEventListener('input', (event) => {
      searchDebounce(event);
   });

   async function getSearchData(event) {
      try {
         let response = await fetch ('../data.json');
         let data = await response.json();
         let filteredData = data.filter(film => film.title.toLowerCase().includes(event.target.value.toLowerCase()) && film.category === type);

         let sectionWithMovies = document.querySelector(`.${section}`);
         let resultSearch = document.querySelector('.result');

         if (event.target.value.length > 0) {

            sectionWithMovies.classList.add('hide');
            resultSearch.classList.remove('hide');

            resultSearch.querySelector('.result__title').textContent = `
               Found ${filteredData.length} results for ‘${event.target.value}’
            `;

            resultSearch.querySelector('.result__cards').innerHTML = '';

            renderSearchResult(filteredData);
         } else {
            sectionWithMovies.classList.remove('hide');
            resultSearch.classList.add('hide');
         }
      } catch (error) {
         console.log(error);
      }
   }
}

export default showSearchResultsByType;