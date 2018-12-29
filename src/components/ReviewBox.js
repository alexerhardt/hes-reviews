import React from 'react';


const ReviewBox = props => (
      <div className="card p-5 mb-5">

        <div className="container">

          <div className="columns mb-3">
            <div className="column col-6 col-md-12 mb-2">
              {props.review.author}
            </div>
            <div className="column col-6 col-md-12 col-ml-auto mb-2 text-right">
              {props.review.reviewDate}
            </div>
            <div className="column col-12">
              {props.review.semester}
            </div>
          </div>

          <div className="columns mb-3">
            <div className="column col-12">
              <div className="chip"> 
                <figure className="avatar avatar-sm" data-initial={props.review.courseRating}></figure>
                Course Rating
              </div>
              <div className="chip"> 
                <figure className="avatar avatar-sm" data-initial={props.review.difficulty}></figure>
                Difficulty
              </div>
              <div className="chip"> 
                <figure className="avatar avatar-sm" data-initial={props.review.staffRating}></figure>
                Staff Rating
              </div>
              <div className="chip"> 
                <figure className="avatar avatar-sm" data-initial={props.review.workload}></figure>
                Workload
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column col-12">
              <p>{props.review.reviewText}</p>
            </div>
          </div>

          {/* ONLY SHOW EDIT OPTIONS IF EXPLICITLY ENABLED */}
          {
            props.showEditOptions &&
            <div className="columns">
              <div className="column col-12">
                <button className="btn">
                  <i className="icon icon-edit"></i>
                  &nbsp; Edit
                </button>
                <button className="btn ml-2">
                  <i className="icon icon-cross"></i>
                  &nbsp; Delete
                </button>

              </div>
            </div>
          }

        </div>
        
      </div>
)


export default ReviewBox;