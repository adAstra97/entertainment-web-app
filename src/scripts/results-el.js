function createResultEl() {
   let resultEl = document.createElement('div');
   resultEl.className = 'result hide';
   resultEl.innerHTML = `
      <h2 class="result__title"></h2>
      <div class="result__cards"></div>
   `;

   document.querySelector('.main').append(resultEl);
}

export default createResultEl;