import React from 'react';
import Header from './Header';
import BasicSelect from './BasicSelect';
import MarkdownEditor from './MarkdownEditor';
import CourseSearchBox from './CourseSearchBox';
import MessageToast from './MessageToast';

import axios from 'axios';
import { connect } from 'react-redux';
import { updateCourse } from '../actions/courseActions';

import classnames from 'classnames';
import { autosuggestNameGen } from '../utils/utils-client';
import { isEmptyObject } from '../../utils/utils-global';

import Maps from '../utils/Maps';

const maxReviewLength = 3000;

const defaultText = 
`## Your course review.

Tell us about your experience with the course, for example:

* Was it interesting? Useful?
* How much work was it?
* How'd you like the teaching staff?

You can even format your review nicely with Markdown and see a live preview on the right pane. *Whoa!*
`

class WriteReviewPage extends React.Component
{
  FIRST_TIME = 1;

  networkStates = {
    IDLE: 0,
    WAITING: 1
  }

  editorWindowStates = {
    INIT: "",
    LEFT: "slide-left",
    RIGHT: "slide-right"
  };

  state = {
      editorValue: defaultText,
      networkState: this.networkStates.IDLE,
      windowPosition: this.editorWindowStates.INIT,
      selectedCourseName: '',
      selectedCourseId: '',
      searchValue: '',
      difficulty: '',
      rating: '',
      semester: '',
      workload: '',
      errors: {},
      wordCount: defaultText.length,
      bottomToast: {}
  }

  handleEditorFocus = () => {
      if (this.FIRST_TIME) {
          this.FIRST_TIME = 0;
          this.setState(() => ({
              editorValue: "",
              wordCount: 0
          }));
      }
  }

  handleEditorChange = (event) => {
    const reviewText = event.target.value;
    if (reviewText.length <= maxReviewLength) {
      this.setState({ 
        editorValue: event.target.value,
        wordCount: reviewText.length
      });
    }
  }

  handleToggleClick = () => {
    console.log("toggle fired");
    const wstates = this.editorWindowStates;
    const oldPos = this.state.windowPosition;
    const newPos = oldPos ==  wstates.LEFT ? wstates.RIGHT : wstates.LEFT;
    
    this.setState(() => ({
        windowPosition: newPos
    }));
  }

  // Called when a suggestion is selected in the course search
  onSuggestionSelected = (_, { suggestion} ) => {
    console.log('onSuggestion selected fired');
    this.setState({
      selectedCourseName: suggestion.name,
      selectedCourseId: suggestion.id
    });
  }

  onCourseSearchBoxChange = (_, { newValue }) => {
    this.setState({
      selectedCourseName: '',
      selectedCourseId: '',
      searchValue: newValue
    });
  }

  onWorkloadChange = (e) => {
    const workload = e.target.value;

    if (!workload || workload.match(/^\d{1,3}$/)) {
      this.setState({ workload });
    }
  }

  // TODO: Abstract the validation logic elsewhere - it's ugly
  onReviewSubmit = () => {
    if (this.state.networkState != this.networkStates.IDLE) {
      return;
    }

    this.setState({ networkState: this.networkStates.WAITING });

    console.log('state', this.state);

    // TODO: Change to const
    const { difficulty, rating, workload, editorValue,  
            semester, selectedCourseName, selectedCourseId } = this.state;
          
    const year = parseInt(this.state.year);

    const errors = {};
    const emptyMsg = "Must select one."

    if (workload < 1 || workload > 144) {
      errors.workload = 'Must be between 1 and 144 hours';
    }
    if (!difficulty) {
      errors.difficulty = emptyMsg;
    }
    if (!rating) {
      errors.rating = emptyMsg;
    }
    if (!semester) {
      errors.semester = emptyMsg;
    }
    if (!selectedCourseId) {
      errors.course = "There was an error fetching the course id";
    }
    if (!selectedCourseName) {
      errors.course = emptyMsg;
    }
    if (!editorValue || editorValue === defaultText) {
      errors.body = "You must write something";
    }

    if (isEmptyObject(errors)) {
      console.log("All good, sending");
      const course = selectedCourseId;
      const body = editorValue;
      const data = { course, semester, year, rating, difficulty, workload, body };
      console.log('data: ', data);
      axios
        .post('/api/reviews/post', data)
        .then((res) => {
          console.log('posted review correctly, res: ', res);

          if (res.data.course) {
            console.log('updating course in Redux...');
            this.props.updateCourse(res.data.course);
          }

          this.setState({ 
            networkState: this.networkStates.IDLE,
            bottomToast: {
              class: 'toast-success',
              headline: 'Review posted successfully',
              body: 'Redirecting you back to courses...'
            }
          });

          setTimeout(() => this.props.history.push('/courses'), 2000);

          // update course in redux
          // show success modal
          // redirect user to /courses or /home
          // res.data.course

        })
        .catch((err) => {
          // show modal / skirt
          this.setState({ 
            networkState: this.networkStates.IDLE,
            bottomToast: {
              class: 'toast-error',
              headline: 'An error occurred',
              body: 'Please try again later'
            }
          });

          console.log('an error occurred: ', err);
        })

      
    }
    else {
      console.log("validation errors: ", errors);
      this.setState({ errors });
    }
  }
      
  render()
  {
    console.log('write-review render(), localStorage.jwtToken: ', localStorage.jwtToken);
    const { errors } = this.state;
    return (
      <div id="container-writepage" className="outer-container bg-gray">
        <Header />

        <div className="container-inner container-inner--writepage">

          <div className="container review-form-items card p-3 mb-5">
            <div className="columns course-select-row">
              <div className="column col-2 py-2">
                <h5 className="course-select-header">Course</h5>
              </div>
              <div className={classnames(
                'column col-10 course-select-col py-2',
                { 'has-error': errors.course }
              )}
              >
                <CourseSearchBox
                  renderSuggestion={(suggestion) => suggestion.code + ' ' + suggestion.name}
                  onSuggestionSelected={this.onSuggestionSelected}
                  selectedCourseName={this.state.selectedCourseName}
                  onChange={this.onCourseSearchBoxChange}
                  searchValue={this.state.searchValue}
                  theme={autosuggestNameGen('editor')}
                />
                {
                  errors.course &&
                  <p className="form-input-hint">
                    {errors.course}
                  </p>
                }
              </div>
            </div>

            <div className="columns">
              <div className="column col-2 col-sm-12 py-2">
                <h5>Semester</h5>
                <BasicSelect 
                  placeholder={"Semester..."}
                  options={Maps.semester}
                  onChange={(e) => this.setState({ semester: e.target.value })}
                  error={this.state.errors.semester}
                  useValue
                />
              </div>

              <div className="column col-2 col-sm-12 py-2">
                <h5>Year</h5>
                <BasicSelect 
                  placeholder={"Year..."}
                  options={Maps.year}
                  onChange={(e) => this.setState({ year: e.target.value })}
                  error={this.state.errors.semester}
                  useValue
                />
              </div>

              <div className="column col-2 col-sm-12 py-2">
                <h5>Difficulty</h5>
                <BasicSelect 
                  placeholder={"Difficulty..."}
                  options={Maps.difficulty}
                  onChange={(e) => this.setState({ difficulty: e.target.value })}
                  error={this.state.errors.difficulty}
                />
              </div>

              <div className="column col-2 col-sm-12 py-2">
                <h5>Rating</h5>
                <BasicSelect 
                  placeholder={"Rating..."}
                  options={Maps.rating}
                  onChange={(e) => this.setState({ rating: e.target.value })}
                  error={this.state.errors.rating}
                />
              </div>
              <div className="column col-4 col-sm-12 py-2">
                <h5>Workload</h5>
                <div 
                  className={classnames(
                    'form-group has-icon-left', 
                    { 'has-error': errors.workload }
                  )}
                >
                  <input 
                    className="form-input" 
                    type="text" 
                    id="workload-input" 
                    placeholder="Hours / Week, eg: 10"
                    value={this.state.workload}
                    onChange={this.onWorkloadChange}
                  />
                  <i className="form-icon icon icon-arrow-right"></i>
                  {
                  errors.workload &&
                  <p className="form-input-hint">
                    {errors.workload}
                  </p>
                  }
                </div>
              </div>

            </div>
          </div>

          <div 
            id="markdown-editor-wrapper" 
            className={classnames('mb-5', { 'has-error': errors.body })}
          >
            <MarkdownEditor
              windowPosition={this.state.windowPosition}
              editorValue={this.state.editorValue}
              onFocus={this.handleEditorFocus}
              onChange={this.handleEditorChange}
              maxLength={3000}
            />
            <div className="columns">
              <div className="column col-6">
                {
                  errors.body &&
                  <p className="form-input-hint">
                    {errors.body}

                  </p>
                }
              </div>
              <div className="column col-6 text-right">
                <span>{this.state.wordCount} / {maxReviewLength}</span>
              </div>
            </div>
          </div>

          <div className="container review-submit-box">
            <div className="columns">
              <div className="column col-12">
                {/* Inverted due to flex + float */}
                <button 
                  onClick={this.onReviewSubmit}
                  className="btn btn-lg btn-primary btn--editor btn--send-review"
                >
                  <i className="icon icon-share"></i>
                  &nbsp;&nbsp;
                  Submit Review
                </button>

                <button 
                  className="btn btn-lg btn--editor btn--preview"
                  onClick={this.handleToggleClick}
                >
                  <i className="icon icon-resize-horiz"></i>
                  &nbsp;&nbsp;
                  Toggle Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        {
          this.state.bottomToast.headline &&
          <MessageToast
            class={this.state.bottomToast.class}
            headline={this.state.bottomToast.headline}
            body={this.state.bottomToast.body}
            onClickDismiss={() => this.setState({ bottomToast: {} })}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = undefined;
export default connect(mapStateToProps, { updateCourse } )(WriteReviewPage);