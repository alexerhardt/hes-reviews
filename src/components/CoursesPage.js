import React from 'react';
import ReactTable from 'react-table';
import TableData from '../data/random-data.json';
import Header from '../components/Header';
import matchSorter from 'match-sorter';

class CoursesPage extends React.Component
{
  state = {
    tableData: TableData
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
        // const path = props.original.code.replace(" ", "_");
        // return (<a href={"/reviews/" + path}>{props.value}</a>)
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
    }, {
      Header: 'Staff',
      accessor: 'staff',
      headerClassName: 'table-width-adj-staff',
      className: 'table-width-adj-staff',
      Cell: props => props.value || "N/A"
    }, {
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
        <div className="container-coursepage-inner p-4">
          <input 
            className="mb-5"
            type="text" 
            placeholder="Search for a course" 
            onChange={this.filterTableData}
          />
          <div className="wrapper-course-table">
            <ReactTable
            data={this.state.tableData}
            columns={columns}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CoursesPage;
