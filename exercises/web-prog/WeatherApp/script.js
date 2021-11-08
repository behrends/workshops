const search_btn = document.getElementById('search_btn');
const search_input = document.getElementById('search_input');
const weather_list = document.getElementById('weather_list');

function addLocation(name) {
  const new_location = document.createElement('div');
  new_location.classList.add('weather_location');
  new_location.innerHTML = `<div class="location">${name}</div>`;
  weather_list.appendChild(new_location);
}

function doSearch() {
  const location_name = search_input.value;
  // TODO: eigentliche Suche nach Ort durchführen
  // TODO: Ort nur hinzufügen, wenn Daten gefunden wurden
  // TODO: Fehlermeldung falls keine Daten gefunden wurden
  // TODO: doppelte Orte vermeiden?
  addLocation(location_name);
}

search_btn.addEventListener('click', doSearch);