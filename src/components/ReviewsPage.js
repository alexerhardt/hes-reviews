import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { redirectToErrorPage } from '../utils/utils-client';
import axios from 'axios';

import Header from './Header';
import ReviewStats from './ReviewStats';
import ReviewFilters from './ReviewFilters';
import ReviewBox from './ReviewBox';

const ratingLabels = ['Very Poor', 'Poor', 'Normal', 'Good', 'Very Good'];
const difficultyLabels = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];

class ReviewsPage extends React.Component {
  state = {
    reviewData: [],
    // TODO: Remove?
    activeFilters: {
      rating: [],
      difficulty: [],
      semester: [],
      year: [],
    },
    semesterFilter: [],
    yearFilter: [],
    ratingFilter: [],
    difficultyFilter: [],
  };

  getFilteredReviews() {
    const reviews = this.state.reviewData;

    return reviews.filter(review => {
      const {
        semesterFilter,
        yearFilter,
        ratingFilter,
        difficultyFilter,
      } = this.state;
      return (
        (yearFilter.length === 0 || yearFilter.includes(review.year)) &&
        (difficultyFilter.length === 0 ||
          difficultyFilter.includes(review.difficulty)) &&
        (semesterFilter.length === 0 ||
          semesterFilter.includes(review.semester)) &&
        (ratingFilter.length === 0 || ratingFilter.includes(review.rating))
      );
    });
  }

  /**
   * Takes all reviews, and creates Sets of its unique
   * fields (rating, difficulty, semester, year)
   * @returns {Object} An object with values and labels for the filter dropdowns
   */
  getFilterOptions() {
    const reviews = this.state.reviewData;

    let sets = [new Set(), new Set(), new Set(), new Set()];

    // Create sets with unique field values for the reviews
    reviews.forEach(review => {
      sets[0].add(review.rating);
      sets[1].add(review.difficulty);
      sets[2].add(review.semester);
      sets[3].add(review.year);
    });

    // TODO: term names are not sorted, do something about it
    return {
      rating: [...sets[0]]
        .sort()
        .map(rating => ({ value: rating, label: ratingLabels[rating - 1] })),
      difficulty: [...sets[1]]
        .sort()
        .map(diff => ({ value: diff, label: difficultyLabels[diff - 1] })),
      semester: [...sets[2]].map(term => ({ value: term, label: term })),
      year: [...sets[3]].map(year => ({ value: year, label: year })),
    };
  }

  // TODO: We should inline these bad boys in render()
  onChangeDifficultyFilter = e => {
    this.setState({
      difficultyFilter: e.map(opt => opt.value),
    });
  };

  onChangeSemesterFilter = e => {
    this.setState({
      semesterFilter: e.map(opt => opt.value),
    });
  };

  onChangeRatingFilter = e => {
    this.setState({
      ratingFilter: e.map(opt => opt.value),
    });
  };

  onChangeYearFilter = e => {
    this.setState({
      yearFilter: e.map(opt => opt.value),
    });
  };

  /**
   * TODO: This is blatantly wrong...
   * URLS should be accessible by course id instead of course code
   * At present users cannot save a Review page (such as bookmark it)
   */
  componentDidMount = () => {
    console.log('ReviewsPage cWM() history', this.props.location);
    const { courseId } = this.props.location.state;

    if (!courseId) {
      const error = {
        status: 500,
        statusText: 'Server Error',
        data: 'Review not found. Go to Courses page and try from there',
      };
      redirectToErrorPage(error, this.props.history);
    } else {
      axios
        .get('/api/reviews/' + courseId)
        // TODO: Check if this has broken anything
        .then(res => this.setState({ reviewData: res.data }))
        .catch(err => redirectToErrorPage(err, this.props.history));
    }
  };

  render() {
    console.log('ReviewsPage render() history', this.props.location.state);
    const filteredReviews = this.getFilteredReviews();

    return (
      <div id="container-reviewspage" className="container-outer">
        <Header />

        <div className="container container-inner container-inner--reviewspage">
          <div className="columns">
            <div className="column col-3 col-md-12 col-stats bg-primary">
              <ReviewStats courseId={this.props.location.state.courseId} />
              <ReviewFilters
                filterOptions={this.getFilterOptions()}
                onChangeDifficultyFilter={this.onChangeDifficultyFilter}
                onChangeRatingFilter={this.onChangeRatingFilter}
                onChangeSemesterFilter={this.onChangeSemesterFilter}
                onChangeYearFilter={this.onChangeYearFilter}
              />
            </div>

            <div className="column col-9 col-md-12 col-reviews bg-gray">
              <TransitionGroup exit={false}>
                {filteredReviews.map(review => (
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
    );
  }
}

export default ReviewsPage;
