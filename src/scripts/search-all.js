import createInput from "./search-field";
import renderSearchResult from "./search-results";
import { debounce } from "./debounce";

function showSearchResults() {

   let searchDebounce = debounce(searchString => {
      getSearchData(searchString);
   }, 700);

   function createSearchEl() {
      createInput('Search for movies or TV series');

      let inputSearch = document.querySelector('#search-input');
      inputSearch.addEventListener('input', (event) => {
         searchDebounce(event);
      });
   }

   async function getSearchData(event) {
      try {
         let response = await fetch ('../data.json');
         let data = await response.json();
         let filteredData = data.filter(film => film.title.toLowerCase().includes(event.target.value.toLowerCase()));

         let trendingSection = document.querySelector('.trending');
         let recomSection = document.querySelector('.recommended');
         let resultSearch = document.querySelector('.result');

         if (event.target.value.length > 0) {

            trendingSection.classList.add('hide');
            recomSection.classList.add('hide');
            resultSearch.classList.remove('hide');

            resultSearch.querySelector('.result__title').textContent = `
               Found ${filteredData.length} results for ‘${event.target.value}’
            `;

            resultSearch.querySelector('.result__cards').innerHTML = '';

            renderSearchResult(filteredData);

         } else {
            trendingSection.classList.remove('hide');
            recomSection.classList.remove('hide');
            resultSearch.classList.add('hide');
         }
      } catch (error) {
         console.log(error);
      }
   }

   createSearchEl();
}

export default showSearchResults;