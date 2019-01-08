import React from 'react';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import matchSorter from 'match-sorter';

import courseData from '../data/random-data.json';

/**
 * CourseSearchBox
 * Component for autocomplete course searching
 * Key dependencies:
 * - match-sorter filters the data according to user input
 * - react-autosuggest renders the suggestions
 * Suggestions are rendered as Links which redirect on click
 * (think how Google search suggestions work)
 * Component styling must be handled by the parent through JSS or other method
 */
class CourseSearchBox extends React.Component
{
  state = {
    searchValue: '',   // the input box value
    matchedCourses: [] // suggestions returned from user input
  }

  /**
   * Executes the search when user types query
   */
  onSuggestionsFetchRequested = ({ value }) => 
  {
    const keys = {keys: ['code', 'name']};
    const matchedCourses = matchSorter(courseData, value, keys).slice(0, 5);
    this.setState(() => ({matchedCourses}));
  };

  /**
   * Handles cleared input
   */
  onSuggestionsClearRequested = () => 
  {
      this.setState({
          suggestions: []
      });
  };

  /**
   * Dictates how each individual suggestion is rendered
   * We create a React-DOM Link which directs to the relevant course page
   * when clicked
   */
  renderSuggestion = (suggestion) => 
  {
    const url = suggestion.code.trim().replace(/\s/g, '-').toLowerCase();

    return (
      <Link to={'course/' + url}>{`${suggestion.code} - ${suggestion.name}`}</Link>
    );
  };

  /**
   * The input change handler
   */
  onChange = (event, { newValue }) =>
  {
    this.setState({
      searchValue: newValue
    });
  };

  /**
   * This is the value for the HTML input, but in our case it's useless;
   * we don't use the input value and redirect automatically on click
   */
  getSuggestionValue = (suggestion) => {
    suggestion.code 
  };

  render()
  {
    const { searchValue, matchedCourses } = this.state;

    const inputProps = {
      placeholder: 'Search for a course...',
      value: searchValue,
      onChange: this.onChange
    }

    return (
      <Autosuggest 
        suggestions={matchedCourses}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={this.props.theme}
      />
    )
  }

}

export default CourseSearchBox;