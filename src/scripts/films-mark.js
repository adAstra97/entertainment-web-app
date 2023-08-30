function changeStatusBookmarks(event) {
   let series = [];
   let movies = [];
   let mark = event.target.closest('.card__bookmark');

   if (!mark) return;

   let card = event.target.closest('.card');

   if (localStorage.getItem('bookmarkedMovies')) {
      movies = JSON.parse(localStorage.getItem('bookmarkedMovies'));
   }
   if (localStorage.getItem('bookmarkedSeries')) {
      series = JSON.parse(localStorage.getItem('bookmarkedSeries'));
   }

   if (movies.indexOf(card.dataset.id) !== -1) {
      mark.classList.remove('bookmarked');
      movies.splice(movies.indexOf(card.dataset.id), 1);
   } else if (series.indexOf(card.dataset.id) !== -1) {
      mark.classList.remove('bookmarked');
      series.splice(series.indexOf(card.dataset.id), 1);
   } else {
      if (card.querySelector('.type')) {
         if (card.querySelector('.type').textContent === 'Movie') {
            mark.classList.add('bookmarked');
            movies.push(card.dataset.id);
         } else if (card.querySelector('.type').textContent === 'TV Series') {
            mark.classList.add('bookmarked');
            series.push(card.dataset.id);
         }
      } else {
         if (card.parentNode.querySelector('.type').textContent === 'Movie') {
            mark.classList.add('bookmarked');
            movies.push(card.dataset.id);
         } else if (card.parentNode.querySelector('.type').textContent === 'TV Series') {
            mark.classList.add('bookmarked');
            series.push(card.dataset.id);
         }
      }
   }

   if (window.location.pathname === '/bookmarks') {
      let bookmarkedMoviesEl = document.querySelector('.bookmarked-movies');
      let bookmarkedSeriesEl = document.querySelector('.bookmarked-series');
      let resultEl = document.querySelector('.result');

      document.querySelector(`[data-id="${card.dataset.id}"]`).parentNode.remove();
      card.parentNode.remove();

      if (movies.length === 0) bookmarkedMoviesEl.classList.add('hide');
      if (series.length === 0) bookmarkedSeriesEl.classList.add('hide');

      if (bookmarkedMoviesEl.classList.contains('hide') && bookmarkedSeriesEl.classList.contains('hide') && resultEl.classList.contains('hide')) {
         document.querySelector('.no-bookmarked').classList.remove('hide');
      }
   } else {
      if (mark.classList.contains('bookmarked')) {
         document.querySelector(`[data-id="${card.dataset.id}"]`).querySelector('.card__bookmark').classList.add('bookmarked');
      } else if (!mark.classList.contains('bookmarked')) {
         document.querySelector(`[data-id="${card.dataset.id}"]`).querySelector('.card__bookmark').classList.remove('bookmarked');
      }
   }

   localStorage.setItem('bookmarkedMovies', JSON.stringify(movies));
   localStorage.setItem('bookmarkedSeries', JSON.stringify(series));
};

export default changeStatusBookmarks;


