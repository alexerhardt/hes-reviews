import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import TableData from '../data/random-data.json';
import Header from '../components/Header';
import matchSorter from 'match-sorter';

import { getCourses } from '../actions/courseActions';

class CoursesPage extends React.Component
{
  state = {
    tableData: this.props.courses 
  }

  componentDidMount = () => {
    if (this.props.courses.length === 0) {
      this.props.getCourses(this.props.history);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ tableData: nextProps.courses });
  }

  filterTableData = (event) => {
    const keys = {keys: ['code', 'name']};
    const tableData = matchSorter(TableData, event.target.value, keys);
    this.setState(() => ({tableData}));
  }

  render()
  {
    const columns = [{
      Header: 'Code',
      accessor: 'code',
      headerClassName: 'table-width-adj-code',
      className: 'table-width-adj-code',
    }, {
      Header: 'Name',
      accessor: 'name',
      headerClassName: 'table-width-adj-name',
      className: 'table-width-adj-name',
      minWidth: 200,
      Cell: props => {
        return (<a href={"/reviews/"}>{props.value}</a>)
      }
    }, {
      Header: 'Reviews',
      accessor: 'reviews',
      headerClassName: 'table-width-adj-reviews',
      className: 'table-width-adj-reviews',
      Cell: props => props.value || "N/A"
    }, {
      Header: 'Rating',
      accessor: 'rating',
      headerClassName: 'table-width-adj-rating',
      className: 'table-width-adj-rating',
      Cell: props => props.value || "N/A"
    }, 
    {
      Header: 'Difficulty',
      accessor: 'difficulty',
      headerClassName: 'table-width-adj-difficulty',
      className: 'table-width-adj-difficulty',
      Cell: props => props.value || "N/A"
    }, {
      Header: 'Workload',
      accessor: 'workload',
      headerClassName: 'table-width-adj-workload',
      className: 'table-width-adj-workload',
      Cell: props => props.value ? props.value + "h / week" : "N/A"
    }]

    return (
      <div id="container-coursepage" className="container-outer bg-gray">
        <Header />
        <div className="container-coursepage-inner bg-gray">
          <input 
            className="table-search-input mb-5"
            type="text" 
            placeholder="Search for a course" 
            onChange={this.filterTableData}
          />
          <div className="wrapper-course-table">
            <ReactTable
              data={this.state.tableData}
              defaultPageSize={12}
              columns={columns}
            />
          </div>
        </div>
      </div>
    )
  }
}

CoursesPage.propTypes = {
  getCourses: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  courses: state.courses
});

export default connect(mapStateToProps, { getCourses })(CoursesPage);
