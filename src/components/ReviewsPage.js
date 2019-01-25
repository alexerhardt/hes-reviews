import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { redirectToErrorPage } from '../utils/utils-client';
import axios from 'axios';

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
    reviewData: [],
    activeFilters: {
      rating: [],
      difficulty: [],
      semester: []
    }
  }

  getFilteredReviews()
  {
    const reviews = this.state.reviewData;

    return reviews.filter((review) => {
      const f = this.state.activeFilters;
      return (f.rating.length == 0 || f.rating.includes(review.courseRating))
          && (f.difficulty.length == 0 || f.difficulty.includes(review.difficulty))
          && (f.semester.length == 0 || f.semester.includes(review.semester));
    });
  }

  // create filter options for filter component
  getFilterOptions()
  {
    const reviews = this.state.reviewData;

    let sets = [new Set(), new Set(), new Set()];

    reviews.forEach((review) => {
      sets[0].add(review.rating);
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

  /**
   * Mutating state directly is bad, but as long as shouldComponentUpdate()
   * is not needed, this should do. See discussion:
   * https://stackoverflow.com/a/29537485/6854595
   */

  onChangeDifficultyFilter = (e) => 
  {
    this.state.activeFilters.difficulty = e.map(opt => opt.value);
    this.forceUpdate();
  }

  onChangeSemesterFilter = (e) =>
  {
    console.log("onChangeSemesterFilter fired");
    this.state.activeFilters.semester = e.map(opt => opt.value);
    this.forceUpdate();
  }

  onChangeRatingFilter = (e) =>
  {
    this.state.activeFilters.rating = e.map(opt => opt.value);
    this.forceUpdate();
  }

  /**
   * TODO: This is blatantly wrong...
   * URLS should be accessible by course id instead of course code
   * At present users cannot save a Review page (such as bookmark it)
   */
  componentDidMount = () => {
    console.log('ReviewsPage cWM() history', this.props.location.state);
    const { courseId } = this.props.location.state;

    if (!courseId) {
      const error = {
        status: 500,
        statusText: 'Server Error',
        data: 'Review not found. Go to Courses page and try from there'
      }
      redirectToErrorPage(error, this.props.history);
    }
    else {
      axios
        .get('/api/reviews/' + courseId)
        .then((res => this.setState({ reviewData: res.data })))
        .catch((err) => redirectToErrorPage(err, this.props.history));
    }
  }

  render()
  {
    console.log('ReviewsPage render() history', this.props.location.state);
    const filteredReviews = this.getFilteredReviews();

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
                onChangeRatingFilter={this.onChangeRatingFilter}
                onChangeSemesterFilter={this.onChangeSemesterFilter}
              />
            </div>

            <div className="column col-9 col-md-12 col-reviews bg-gray">
              <TransitionGroup exit={false}> 
                {filteredReviews.map((review) => (
                  <CSSTransition
                    key={review.reviewDate}
                    timeout={300}
                    classNames="fade"
                  > 
                    <ReviewBox review={review} />
                  </CSSTransition> 
                  ))}
              </TransitionGroup>

            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default ReviewsPage;