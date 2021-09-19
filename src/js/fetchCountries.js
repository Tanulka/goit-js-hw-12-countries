const BASE_URL = `https://restcountries.eu/rest/v2`;

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}`).then(response => response.json());
}
