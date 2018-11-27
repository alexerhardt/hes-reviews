import React from 'react';
import Header from './Header';
import ReviewStats from './ReviewStats';
import ReviewFilters from './ReviewFilters';
import ReviewBox from './ReviewBox';
import ReviewData from '../data/review-data.json';

class ReviewsPage extends React.Component
{
  state = {
    reviewData: ReviewData
  }

  render()
  {
    return (
      <div id="container-reviewspage" className="container-outer">
        <Header />

        <div className="container container-inner container-inner--reviewspage">
          <div className="columns">

            <div className="column col-3 col-md-12 col-stats">
              <ReviewStats />
              <ReviewFilters />
            </div>

            <div className="column col-9 col-md-12 col-reviews">
              {this.state.reviewData.map((review) => (<ReviewBox review={review} />))}
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default ReviewsPage;