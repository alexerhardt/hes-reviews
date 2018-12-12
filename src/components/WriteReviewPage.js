import React from 'react';
import Header from './Header';
import BasicSelect from './BasicSelect';
import MarkdownEditor from './MarkdownEditor';

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
      windowPosition: this.editorWindowStates.INIT
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
      
  render()
  {
    console.log("Maps: " + Maps.difficulty);
    return (
      <div id="container-writepage" className="outer-container bg-gray">
        <Header />

        <div className="container-inner container-inner--writepage p-5">
          <div className="container review-form-items card p-3">
            <div className="columns">
              <div className="column col-3">
                <h5>Difficulty</h5>
                <BasicSelect 
                  placeholder={"Difficulty..."}
                  options={Maps.difficulty}
                />
              </div>

              <div className="column col-3">
                <h5>Rating</h5>
                <BasicSelect 
                  placeholder={"Rating..."}
                  options={Maps.rating}
                />
              </div>
              <div className="column col-3">
                <h5>Semester</h5>
                <BasicSelect 
                  placeholder={"Semester..."}
                  options={Maps.semester}
                />
              </div>
              <div className="column col-3">
                <h5>Weekly Workload</h5>
                <div className="form-group has-icon-left">
                  <input class="form-input" type="text" id="workload-input" placeholder="Hours / Week, eg: 10" />
                  <i class="form-icon icon icon-arrow-right"></i>
                </div>
              </div>

            </div>
          </div>

          <div className="markdown-editor-wrapper">
            <MarkdownEditor
              windowPosition={this.state.windowPosition}
              editorValue={this.state.editorValue}
              onFocus={this.handleEditorChange}
              onChange={this.handleEditorChange}
            />
          </div>

          <div className="container review-submit-box">
            <div className="columns">
              <div className="column col-12">
                {/* Inverted due to flex + float */}
                <button 
                  className="btn btn-lg btn-primary float-right px-4 ml-4"
                >
                  <i className="icon icon-share"></i>
                  &nbsp;&nbsp;
                  Submit Review
                </button>

                <button className="btn btn-lg float-right px-4"
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
// const editorWindowStates = {
//   INIT: "",
//   LEFT: "slide-left",
//   RIGHT: "slide-right"
// };
// WriteReviewPage.editorWindowState = editorWindowStates;

export default WriteReviewPage;