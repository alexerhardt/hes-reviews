import React from 'react';

class ReviewBox extends React.Component
{
  render()
  {
    return (
      <div className="review-box">
        <p>{this.props.review.author}</p>
        <p>{this.props.review.reviewDate}</p>
        <p>{this.props.review.semester}</p>
        <p>{this.props.review.difficulty}</p>
        <p>{this.props.review.courseRating}</p>
        <p>{this.props.review.staffRating}</p>
        <p>{this.props.review.workload}</p>
        <p>{this.props.review.reviewText}</p>
      </div>
    )
  }
}

export default ReviewBox;