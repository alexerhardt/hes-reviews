import React from 'react';
import Header from './Header';

class WriteReviewPage extends React.Component
{
  render()
  {
    return (
      <div id="container-writepage" className="outer-container">
        <Header />

        <div className="container-inner container-inner--writepage p-5">
          <div className="container review-form-items">
            <div className="columns">
              {/* TODO: Abstract this into components */}
              <div className="column col-3">
                <div class="form-group">
                  <select class="form-select">
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                  </select>
                </div>
              </div>

              <div className="column col-3">
                <div class="form-group">
                  <select class="form-select">
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                  </select>
                </div>
              </div>
              <div className="column col-3">
                <div class="form-group">
                  <select class="form-select">
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                  </select>
                </div>
              </div>
              <div className="column col-3">
                <div class="form-group">
                  <select class="form-select">
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                  </select>
                </div>
              </div>

            </div>




          </div>

          <div className="container review-editor-box">

          </div>

          <div className="container review-submit-box">

          </div>

        </div>

      </div>
    )
  }
}

export default WriteReviewPage;