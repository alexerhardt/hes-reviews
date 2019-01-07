import React from 'react';
import Autosuggest from 'react-autosuggest';
import matchSorter from 'match-sorter';

import courseData from '../data/random-data.json';


class CourseSearchBox extends React.Component
{
  state = {
    searchValue: '',
    matchedCourses: []
  }


  

  onSuggestionsFetchRequested = ({ value }) => 
  {
    console.log('onSuggestionsFetchRequested: ' + value);
    const keys = {keys: ['code', 'name']};
    const matchedCourses = matchSorter(courseData, value, keys).slice(0, 5);
    // TODO: Check if we can pass without function
    this.setState(() => ({matchedCourses}));
  };

  onSuggestionsClearRequested = () => 
  {
      console.log('onSuggestionsClearRequested');
      this.setState({
          suggestions: []
      });
  };

  renderSuggestion = (suggestion) => 
  (
      // <div>
          `${suggestion.code} - ${suggestion.name}`
      // </div>
  );

  onChange = (event, { newValue }) =>
  {
    console.log('onChange called, newValue: ' + newValue);
    this.setState({
      searchValue: newValue
    });
  };

  // TODO: See if can be removed altogether
  getSuggestionValue = suggestion => suggestion.code;

  render()
  {
    console.log("render() called");
    console.log("theme: " + JSON.stringify(this.props.theme));

    const { searchValue, matchedCourses } = this.state;

    const inputProps = {
      placeholder: 'Search for a course...',
      value: searchValue,
      onChange: this.onChange
    }

    const theme = {
      container: 'alex-am-a-container',
      input: 'alex-am-a-input'
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
        // theme={theme}
      />
    )
  }

}

export default CourseSearchBox;