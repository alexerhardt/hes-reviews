import React from 'react';
import Header from './Header';
import ReviewStats from './ReviewStats';
import ReviewFilters from './ReviewFilters';
import ReviewBox from './ReviewBox';
import ReviewData from '../data/review-data.json';


const ratingLabels = ["Very Poor", "Poor", "Normal", "Good", "Very Good"];
const difficultyLabels = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

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

  // constructor()
  // {
  //   super();
  //   this.onChangeDifficultyFilter = this.onChangeDifficultyFilter.bind(this);
  // }

  getFilteredReviews()
  {
    return ReviewData.filter((review) => {
      const f = this.state.activeFilters;
      return (f.rating.length == 0 || f.rating.includes(review.courseRating))
          && (f.difficulty.length == 0 || f.difficulty.includes(review.difficulty))
          && (f.semester.length == 0 || f.semester.includes(review.semester));
    });
  }

  // create filter options for filter component
  getFilterOptions()
  {
    let sets = [new Set(), new Set(), new Set()];

    ReviewData.forEach((review) => {
      sets[0].add(review.courseRating);
      sets[1].add(review.difficulty);
      sets[2].add(review.semester);
    });

    // TODO: term names are not sorted, do something about it
    return {
      rating: [...sets[0]].sort().map(rating => 
        ({value: rating, label: ratingLabels[rating - 1]})),
      difficulty: [...sets[1]].sort().map(diff => 
        ({value: diff, label: difficultyLabels[diff - 1]})),
      semester: [...sets[2]].map(term => 
        ({value: term, label: term}))
    }
  }

  onChangeDifficultyFilter = (e, o) => {
    console.log("e: " + JSON.stringify(e, null, 2));
    console.log("o: " + JSON.stringify(o, null, 2));
    this.setState((prevState) => ({
      activeFilters: {
        rating: prevState.activeFilters.rating,
        difficulty: e.map(opt => opt.value),
        semester: prevState.activeFilters.semester
      }
    }));
  }

  render()
  {
    const filteredReviews = this.getFilteredReviews();
    // console.log("opts: " + JSON.stringify(this.getFilterOptions(), null, 2));
    return (
      <div id="container-reviewspage" className="container-outer">
        <Header />

        <div className="container container-inner container-inner--reviewspage">
          <div className="columns">

            <div className="column col-3 col-md-12 col-stats bg-primary">
              <ReviewStats />
              <ReviewFilters 
                filterOptions={this.getFilterOptions()} 
                onChangeDifficultyFilter={this.onChangeDifficultyFilter}
              />
            </div>

            <div className="column col-9 col-md-12 col-reviews bg-gray">
              {filteredReviews.map((review) => (<ReviewBox review={review} />))}
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default ReviewsPage;