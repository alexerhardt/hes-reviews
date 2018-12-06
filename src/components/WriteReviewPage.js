import React from 'react';
import Header from './Header';
import BasicSelect from './BasicSelect';
import MarkdownEditor from './MarkdownEditor';

import Maps from '../utils/Maps';


class WriteReviewPage extends React.Component
{
  FIRST_TIME = 1;

  state = {
      editorValue: "Hello world!",
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
      
  render()
  {
    console.log("Maps: " + Maps.difficulty);
    return (
      <div id="container-writepage" className="outer-container">
        <Header />

        <div className="container-inner container-inner--writepage p-5">
          <div className="container review-form-items p-3">
            <div className="columns">
              {/* TODO: Abstract this into components */}
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

          <div className="container markdown-editor-wrapper">
            <MarkdownEditor
              windowPosition={this.editorWindowStates}
              editorValue={this.state.editorValue}
              onFocus={this.handleEditorChange}
              onChange={this.handleEditorChange}
            />

          </div>

          <div className="container review-submit-box">
            <div className="columns">
              <div className="column col-3 col-ml-auto">
                <button className="btn btn-lg btn-primary float-right px-4">Send Review</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
const editorWindowStates = {
  INIT: "",
  LEFT: "slide-left",
  RIGHT: "slide-right"
};
WriteReviewPage.editorWindowState = editorWindowStates;

export default WriteReviewPage;