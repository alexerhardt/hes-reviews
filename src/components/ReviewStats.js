import React from 'react';
import axios from 'axios';
import { getAverage } from '../utils/utils-client';

// TODO: Make this stateless
class ReviewStats extends React.Component
{
  state = {
    reviewCount: undefined,
    rating: undefined,
    difficulty: undefined,
    workload: undefined
  }

  // TODO:
  // Screwed up here, data should probably come from parent
  // There is a short delay where "N/A" is being shown all around
  componentDidMount = () => {
    const courseId = this.props.courseId;
    console.log('ReviewStats: courseId: ', courseId);

    axios
      .get('/api/courses/by-id/' + courseId)
      .then((res) => {
        console.log('ReviewStats response: ', res.data) 
        const { reviewCount, aggRating, aggDifficulty, aggWorkload } = res.data;
        this.setState({
          reviewCount,
          rating: getAverage(aggRating, reviewCount),
          difficulty: getAverage(aggDifficulty, reviewCount),
          workload: Math.round(aggWorkload / reviewCount)
        });
      })
      // Display error message if all else fails
      .catch((err) => console.log('ReviewStats, error fetching data'));

  }
  render()
  {
    const { reviewCount, rating, difficulty, workload } = this.state;

    return (
      <div className="container mb-3">
        <div className="columns">
          <div className="col-12">
            <h3>Key Stats</h3>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-uppercase">Reviews</h6>
            <h4>{reviewCount || 'N/A'}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-uppercase">Rating</h6>
            <h4>{rating || 'N/A'}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-uppercase">Difficulty</h6>
            <h4>{difficulty || 'N/A'}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h6 className="text-uppercase">Workload</h6>
            <h4>{workload ? workload + "h / week" : 'N/A'}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewStats
