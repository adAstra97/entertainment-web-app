import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';


import createResultEl from '../results-el';
import showSearchResults from '../search-all';
import showTrending from '../trending';
import showRecommendation from '../recom';


function createPageHome() {

   showSearchResults();
   showTrending();
   showRecommendation();
   createResultEl();

   const swiper = new Swiper('.swiper', {
      modules: [Autoplay],
      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
      },

      breakpoints: {
         319: {
            slidesPerView: 1,
            spaceBetween: 16,
         },
         375: {
            slidesPerView: 1.5,
            spaceBetween: 16,
         },
         601: {
            spaceBetween: 40,
         },
         900: {
            slidesPerView: 2,
            spaceBetween: 40,
         },
         1070: {
            slidesPerView: 2.5,
            spaceBetween: 40,
         }
      },
      speed: 1000,
   });
}

export default createPageHome;