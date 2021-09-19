// import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryCard from './templates/countryCard.hbs';
import getRefs from './js/refs.js';
import fetchCountries from './js/fetchCountries';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

// let mark = countryList([1, 2, 3]);
// console.log(mark);

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  const input = e.target;
  const searchQuery = input.value;

  fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => (input.value = ''));
}

function renderCountryCard(country) {
  let markup = '';
  if (country.length > 10) {
    error({
      text: 'To many matches found. Please enter a more specific query!',
    });
  } else if (country.length > 1) {
    let markup = country.map(c => `<li> ${c.name} </li>`).join(' ');
    refs.list.innerHTML = markup;
  } else {
    markup = countryCard(country);
    refs.list.innerHTML = markup;
  }
}

function onFetchError() {
  alert('Not found country!');
}
