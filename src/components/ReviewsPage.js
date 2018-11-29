import React from 'react';
import Header from './Header';
import ReviewStats from './ReviewStats';
import ReviewFilters from './ReviewFilters';
import ReviewBox from './ReviewBox';
import ReviewData from '../data/review-data.json';

class ReviewsPage extends React.Component
{
  state = {
    reviewData: ReviewData,
    activeFilters: {
      rating: [],
      difficulty: [],
      semester: []
    }
  }

  getFilteredReviews()
  {
    return ReviewData.filter((review) => {
      const f = this.state.activeFilters;
      return (f.rating.length == 0 || f.rating.includes(review.courseRating))
          && (f.difficulty.length == 0 || f.difficulty.includes(review.difficulty))
          && (f.semester.length == 0 || f.semester.includes(review.semester));
    });
  }

  getFilterKeys()
  {
    let sets = [new Set(), new Set(), new Set()];

    ReviewData.forEach((review) => {
      sets[0].add(review.courseRating);
      sets[1].add(review.difficulty);
      sets[2].add(review.semester);
    });

    // spread operator "spreads" set values in array
    return {
      rating: [...sets[0]],
      difficulty: [...sets[1]],
      semester: [...sets[2]]
    }
  }

  render()
  {
    // console.log("filterKeys: " + JSON.stringify(this.getFilterKeys(), null, 2));
    const filteredReviews = this.getFilteredReviews();
    return (
      <div id="container-reviewspage" className="container-outer">
        <Header />

        <div className="container container-inner container-inner--reviewspage">
          <div className="columns">

            <div className="column col-3 col-md-12 col-stats bg-primary">
              <ReviewStats />
              <ReviewFilters />
            </div>

            <div className="column col-9 col-md-12 col-reviews bg-gray">
              {/* {filteredReviews.map((review) => (<ReviewBox review={review} />))} */}
              {ReviewData.map((review) => (<ReviewBox review={review} />))}
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default ReviewsPage;