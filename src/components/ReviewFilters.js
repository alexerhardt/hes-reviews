import React from 'react';
import Select from 'react-select';

// This will need to be constructed from parent state
const semesterData = [
  { value: 'Spring 2018', label: 'Spring 2018' },
  { value: 'Fall 2017', label: 'Fall 2017' },
  { value: 'Spring 2017', label: 'Spring 2017' } 
];

const difficultyData = [
  { value: 'Very Easy', label: 'Very Easy' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
  { value: 'Very Hard', label: 'Very Hard' },
];

const ratingData = [
  { value: 'Very Poor', label: 'Very Poor' },
  { value: 'Poor', label: 'Poor' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Good', label: 'Good' },
  { value: 'Very Good', label: 'Very Good' },
];

class ReviewFilters extends React.Component
{
  render()
  {
    return (
      <div className="container">
        <div className="columns">
          <div className="col-12">
            <h3>Filters</h3>
          </div>
          <div className="col-12 col-md-6">
            <Select 
              placeholder="Semesters"
              isMulti
              name="semesters"
              options={semesterData}
              className="multi-select"
              classNamePrefix="select"
            />
            <Select 
              placeholder="Rating"
              isMulti
              name="rating"
              options={ratingData}
              className="multi-select"
              classNamePrefix="select"
            />
            <Select 
              placeholder="Difficulty"
              isMulti
              name="difficulty"
              options={difficultyData}
              className="multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>
      </div>
    )
  }

}

export default ReviewFilters;