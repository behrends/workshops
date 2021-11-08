const search_btn = document.getElementById('search_btn');
const search_input = document.getElementById('search_input');

function doSearch() {
  alert('Suche nach: ' + search_input.value);
}

search_btn.addEventListener('click', doSearch);