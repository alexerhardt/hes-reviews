import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import matchSorter from 'match-sorter';

import { getCourses } from '../actions/courseActions';
import { stripCourseCode } from '../../utils/utils-global';

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
    matchedCourses: [], // suggestions returned from user input
    selectedCourseName: '',
    selectedCourseId: ''
  }

  componentDidMount = () => {
    if (this.props.courses.length === 0) {
      this.props.getCourses(this.props.history);
    }
  }

  /**
   * Executes the search when user types query
   */
  onSuggestionsFetchRequested = ({ value }) => 
  {
    const keys = {keys: ['code', 'name']};
    const matchedCourses = matchSorter(this.props.courses, value, keys).slice(0, 5);
    this.setState(() => ({ matchedCourses }));
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
    console.log('renderSuggestion suggestion:', suggestion);
    return (
      <Link to={{
        pathname: '/reviews/' + stripCourseCode(suggestion.code),
        state: { courseId: suggestion.id }
      }}>
        {suggestion.name}
      </Link>
    );
  };

  /**
   * The input change handler
   */
  onChange = (event, { newValue }) =>
  {
    console.log('onChange called, newValue: ', newValue);
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
    const { matchedCourses } = this.state;
    const searchValue  = this.props.searchValue || this.state.searchValue;
    const { selectedCourseName } = this.props;
    console.log('course searchbox render state: ', this.state);
    console.log('selectedCourseName: ', selectedCourseName);
    console.log('searchValue: ', searchValue);

    const inputProps = {
      placeholder: 'Search for a course...',
      value: selectedCourseName || searchValue,
      onChange: this.props.onChange || this.onChange
    }

    return (
      <Autosuggest 
        suggestions={matchedCourses}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.props.renderSuggestion || this.renderSuggestion}
        onSuggestionSelected={this.props.onSuggestionSelected}
        inputProps={inputProps}
        theme={this.props.theme}
      />
    )
  }
}

CourseSearchBox.propTypes = {
  getCourses: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  courses: state.courses
});

// https://reacttraining.com/react-router/core/api/withRouter
// There's a note on shouldComponentUpdate which I don't understand... investigate
export default connect(mapStateToProps, { getCourses })(withRouter(CourseSearchBox));

