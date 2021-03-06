import React from 'react';

const ReviewBox = props => (
  <div className="card p-5 mb-5">
    <div className="container">
      <div className="columns mb-3">
        <div className="column col-6 col-md-12 mb-2">
          {/* {props.review.author} */}
          Anonymous Reviewer
        </div>
        <div className="column col-6 col-md-12 col-ml-auto mb-2 text-right">
          {props.review.reviewDate}
        </div>
        <div className="column col-12 text-capitalize">
          {props.review.semester + ' ' + props.review.year}
        </div>
      </div>

      <div className="columns mb-3">
        <div className="column col-12">
          <div className="chip">
            <figure
              className="avatar avatar-sm"
              data-initial={props.review.rating}
            />
            Course Rating
          </div>
          <div className="chip">
            <figure
              className="avatar avatar-sm"
              data-initial={props.review.difficulty}
            />
            Difficulty
          </div>
          <div className="chip">
            <figure
              className="avatar avatar-sm"
              data-initial={props.review.workload}
            />
            Workload
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column col-12">
          <p>{props.review.body}</p>
        </div>
      </div>

      {/* ONLY SHOW EDIT OPTIONS IF EXPLICITLY ENABLED */}
      {props.showEditOptions && (
        <div className="columns">
          <div className="column col-12">
            <button className="btn">
              <i className="icon icon-edit" />
              &nbsp; Edit
            </button>
            <button className="btn ml-2">
              <i className="icon icon-cross" />
              &nbsp; Delete
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ReviewBox;
