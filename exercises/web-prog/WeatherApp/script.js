const add_btn = document.getElementById('add_btn');
const search_btn = document.getElementById('search_btn');
const search_input = document.getElementById('search_input');
const selected_location = document.getElementById(
  'selected_location'
);
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
  const location_name = search_input.value.trim();
  if (location_name.length === 0) return;
  // TODO: eigentliche Suche nach Ort durchführen
  // TODO: Ort nur hinzufügen, wenn Daten gefunden wurden
  // TODO: Fehlermeldung falls keine Daten gefunden wurden
  // TODO: doppelte Orte vermeiden?
  const temp = 20;
  const condition = 'sonnig';
  const image =
    'https://cdn.glitch.com/c569e324-22c3-491c-ab27-94a3498d6207%2Fsun-line.png?v=1633008214083';
  addLocation(location_name, temp, condition, image);
  search_input.value = '';
}

function doAddFromList() {
  const location_name = selected_location.value;
  // TODO: Daten zu Ort suchen
  // TODO: doppelte Orte vermeiden?
  const temp = 13;
  const condition = 'heiter';
  const image =
    'https://cdn.glitch.me/c569e324-22c3-491c-ab27-94a3498d6207%2Fsun-cloudy-line.png?v=1634724998045';
  addLocation(location_name, temp, condition, image);
}

search_btn.addEventListener('click', doSearch);
add_btn.addEventListener('click', doAddFromList);

let locations = [
  {
    name: 'Berlin',
    latitude: 52.52,
    longitude: 13.41,
  },
  {
    name: 'Basel',
    latitude: 47.55,
    longitude: 7.58,
  },
  {
    name: 'Barcelona',
    latitude: 41.4,
    longitude: 2.16,
  },
  {
    name: 'London',
    latitude: 51.5,
    longitude: -0.11,
  },
  {
    name: 'Paris',
    latitude: 48.85,
    longitude: 2.35,
  },
  {
    name: 'Hamburg',
    latitude: 53.55,
    longitude: 9.99,
  },
  {
    name: 'Kopenhagen',
    latitude: 5.67,
    longitude: 12.57,
  },
  {
    name: 'Rom',
    latitude: 41.88,
    longitude: 12.48,
  },
  {
    name: 'New York',
    latitude: 40.71,
    longitude: -74,
  },
];

function setupLocationList() {
  locations.forEach((location, index) => {
    const option = document.createElement('option');
    option.innerHTML = location.name;
    option.setAttribute('value', index);
    selected_location.appendChild(option);
  });
}

setupLocationList();
