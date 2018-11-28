import React from 'react';

// TODO: Make this stateless
class ReviewStats extends React.Component
{
  render()
  {
    return (
      <div className="container mb-3">
        <div className="columns">
          <div className="col-12">
            <h3>Key Stats</h3>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-italic">Course Rating</h6>
            <h4>4.88</h4>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-italic">Staff Rating</h6>
            <h4>3.77</h4>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-italic">Difficulty</h6>
            <h4>3.22</h4>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-italic">Weekly Workload</h6>
            <h4>13h</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewStats
