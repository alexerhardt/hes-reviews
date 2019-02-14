/**
 * utils-client.js
 * Utilities for the front end
 */
import axios from 'axios';

/**
 * Creates a styling namespace for the react autosuggest component
 * https://github.com/moroshko/react-autosuggest
 * @param {String} suffix 
 */
export const autosuggestNameGen = (suffix) => {
  const baseNames = {
    container:                'suggest__container',
    containerOpen:            'suggest__container--open',
    input:                    'suggest__input',
    inputOpen:                'suggest__input--open',
    inputFocused:             'suggest__input--focused',
    suggestionsContainer:     'suggest__suggestions-container',
    suggestionsContainerOpen: 'suggest__suggestions-container--open',
    suggestionsList:          'suggest__suggestions-list',
    suggestion:               'suggest__suggestion',
    suggestionFirst:          'suggest__suggestion--first',
    suggestionHighlighted:    'suggest__suggestion--highlighted',
    sectionContainer:         'suggest__section-container',
    sectionContainerFirst:    'suggest__section-container--first',
    sectionTitle:             'suggest__section-title'
  };

  let ret = {};
  Object.keys(baseNames).forEach((key) => {
    ret[key] = `${baseNames[key]}--${suffix}`
  });

  return ret;
}


/**
 * Checks if an object or string is empty, null or undefined
 * @param   {Object or String} value The object to check
 * @return  {Boolean} Whether the argument is empty
 */
export const isEmpty = (value) => {

  console.log('isEmpty called');

  return value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

}


/**
 * Sets the auth token for axios requests
 * @param {String} token 
 */
export const setAuthToken = (token) => {
  console.log('set auth token called');
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
  console.log('set auth token done');
};


/**
 * Redirects to an error page on server error
 */
export const redirectToErrorPage = (err, history) => {
  history.push({
    pathname: '/' + err.status,
    state: { 
      status: err.status,
      statusText: err.statusText,
      detail: err.data 
    }
  });
};

/**
 * Calculates average stat for a course
 * @returns {number}
 */
export const getAverage = (aggregateStat, reviewCount) => {
  return Math.floor( (aggregateStat / reviewCount) * 100 ) / 100;
}

