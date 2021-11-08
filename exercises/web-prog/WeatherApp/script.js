const search_btn = document.getElementById('search_btn');
const search_input = document.getElementById('search_input');
const weather_list = document.getElementById('weather_list');

function addLocation(name, temp, condition, image) {
  const new_location = document.createElement('div');
  new_location.classList.add('weather_location');
  new_location.innerHTML = `<div class="location">${name}</div>
    <div class="weather_info">
      <span>
        <span class="temperature">${temp} Grad</span>
        <span class="condition">${condition}</span>
      </span>
      <img
        class="weather_img"
        src="${image}"
        alt="${condition}"
      />
    </div>
  `;
  weather_list.appendChild(new_location);
}

function doSearch() {
  const location_name = search_input.value;
  // TODO: eigentliche Suche nach Ort durchführen
  // TODO: Ort nur hinzufügen, wenn Daten gefunden wurden
  // TODO: Fehlermeldung falls keine Daten gefunden wurden
  // TODO: doppelte Orte vermeiden?
  const temp = 20;
  const condition = 'sonnig';
  const image = "https://cdn.glitch.com/c569e324-22c3-491c-ab27-94a3498d6207%2Fsun-line.png?v=1633008214083";
  addLocation(location_name, temp, condition, image);
}

search_btn.addEventListener('click', doSearch);