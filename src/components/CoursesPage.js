import React from 'react';
import ReactTable from 'react-table';
import TableData from '../data/random-data.json';
import Header from '../components/Header';

class CoursesPage extends React.Component
{
  render()
  {
    const columns = [{
      Header: 'Code',
      accessor: 'code'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Reviews',
      accessor: 'reviews',

      Cell: props => props.value || "N/A"
    }, {
      Header: 'Rating',
      accessor: 'rating',
      Cell: props => props.value || "N/A"
    }, {
      Header: 'Staff',
      accessor: 'staff',
      Cell: props => props.value || "N/A"
    }, {
      Header: 'Difficulty',
      accessor: 'difficulty',
      Cell: props => props.value || "N/A"
    }, {
      Header: 'Workload',
      accessor: 'workload',
      Cell: props => props.value ? props.value + "h / week" : "N/A"
    }]

    return (
      <div>
        <Header />
        <ReactTable
        data={TableData}
        columns={columns}
        />
      </div>
    )
  }
}

export default CoursesPage;
