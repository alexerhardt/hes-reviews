/**
 * utils-client.js
 * Utilities for the front end
 */

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

