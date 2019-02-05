import React from 'react';
import Header from './Header';
import BasicSelect from './BasicSelect';
import MarkdownEditor from './MarkdownEditor';
import CourseSearchBox from './CourseSearchBox';

import { autosuggestNameGen } from '../utils/utils-client';

import Maps from '../utils/Maps';

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

  editorWindowStates = {
    INIT: "",
    LEFT: "slide-left",
    RIGHT: "slide-right"
  };

  state = {
      editorValue: defaultText,
      windowPosition: this.editorWindowStates.INIT,
      selectedCourseName: '',
      selectedCourseId: '',
      searchValue: ''
  }

  handleEditorFocus = () => {
      if (this.FIRST_TIME) {
          this.FIRST_TIME = 0;
          this.setState(() => ({
              editorValue: ""
          }));
      }
  }

  handleEditorChange = (event) => {
      this.setState({editorValue: event.target.value});
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
      
  render()
  {
    console.log("Maps: " + Maps.difficulty);
    return (
      <div id="container-writepage" className="outer-container bg-gray">
        <Header />

        <div className="container-inner container-inner--writepage">

          <div className="container review-form-items card p-3 mb-5">
            <div className="columns course-select-row">
              <div className="column col-3 py-2">
                <h5 className="course-select-header">Course Reviewed</h5>
              </div>
              <div className="column col-9 course-select-col py-2">
                <CourseSearchBox
                  renderSuggestion={(suggestion) => suggestion.code + ' ' + suggestion.name}
                  onSuggestionSelected={this.onSuggestionSelected}
                  selectedCourseName={this.state.selectedCourseName}
                  onChange={this.onCourseSearchBoxChange}
                  searchValue={this.state.searchValue}
                  theme={autosuggestNameGen('editor')}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column col-3 col-sm-12 py-2">
                <h5>Difficulty</h5>
                <BasicSelect 
                  placeholder={"Difficulty..."}
                  options={Maps.difficulty}
                />
              </div>

              <div className="column col-3 col-sm-12 py-2">
                <h5>Rating</h5>
                <BasicSelect 
                  placeholder={"Rating..."}
                  options={Maps.rating}
                />
              </div>
              <div className="column col-3 col-sm-12 py-2">
                <h5>Semester</h5>
                <BasicSelect 
                  placeholder={"Semester..."}
                  options={Maps.semester}
                />
              </div>
              <div className="column col-3 col-sm-12 py-2">
                <h5>Workload</h5>
                <div className="form-group has-icon-left">
                  <input class="form-input" type="text" id="workload-input" placeholder="Hours / Week, eg: 10" />
                  <i class="form-icon icon icon-arrow-right"></i>
                </div>
              </div>

            </div>
          </div>

          <div id="markdown-editor-wrapper" className="mb-5">
            <MarkdownEditor
              windowPosition={this.state.windowPosition}
              editorValue={this.state.editorValue}
              onFocus={this.handleEditorFocus}
              onChange={this.handleEditorChange}
            />
          </div>

          <div className="container review-submit-box">
            <div className="columns">
              <div className="column col-12">
                {/* Inverted due to flex + float */}
                <button 
                  className="btn btn-lg btn-primary btn--editor btn--send-review"
                >
                  <i className="icon icon-share"></i>
                  &nbsp;&nbsp;
                  Submit Review
                </button>

                <button className="btn btn-lg btn--editor btn--preview"
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

      </div>
    )
  }
}

export default WriteReviewPage;