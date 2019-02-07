import React from 'react';
import Select from 'react-select';

class ReviewFilters extends React.Component
{
  render()
  {
    const filterOpts = this.props.filterOptions;

    return (
      <div className="container">
        <div className="columns">
          <div className="col-12">
            <h3>Filters</h3>
          </div>
          <div className="filter-wrap col-12 col-md-6 mb-2 text-capitalize">
            <Select 
              placeholder="Semester"
              isMulti
              name="semesters"
              options={filterOpts.semester}
              onChange={this.props.onChangeSemesterFilter}
              className="multi-select"
              classNamePrefix="react-select"
            />
          </div>
          <div className="filter-wrap col-12 col-md-6 mb-2">
            <Select 
              placeholder="Year"
              isMulti
              name="year"
              options={filterOpts.year}
              onChange={this.props.onChangeYearFilter}
              className="multi-select"
              classNamePrefix="react-select"
            />
          </div>
          <div className="filter-wrap col-12 col-md-6 mb-2">
            <Select 
              placeholder="Rating"
              isMulti
              name="rating"
              options={filterOpts.rating}
              onChange={this.props.onChangeRatingFilter}
              className="multi-select"
              classNamePrefix="react-select"
            />
          </div>
          <div className="filter-wrap col-12 col-md-6 mb-2"> 
            <Select 
              placeholder="Difficulty"
              isMulti
              name="difficulty"
              options={filterOpts.difficulty}
              onChange={this.props.onChangeDifficultyFilter}
              className="multi-select"
              classNamePrefix="react-select"
            />
          </div>
        </div>
      </div>
    )
  }

}

export default ReviewFilters;