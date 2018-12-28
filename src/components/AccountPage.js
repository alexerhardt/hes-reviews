import React from 'react';
import Header from './Header';
import ReviewBox from './ReviewBox';

import ReviewData from '../data/review-data.json';

const userReviews = ReviewData.slice(0, 9);

class AccountPage extends React.Component
{
  render()
  {
    return (
      <div id="container-accountpage" className="bg-gray">
        <Header />

        <div className="container container-inner container-inner__accountpage">

          {/* PASSWORD OPTIONS CONTAINER */}
          <div className="container container__password-options my-5">
            <div className="columns">
              <div className="column col-12">
                <h2>Account Options</h2>
              </div>

              <div className="column col-12">
                <div className="card">
                  {/* PASSWORD CHANGE FORM */}
                  <div className="columns">
                    <div className="column col-12">
                      <h5>Password Change</h5>
                    </div>
                    <div className="column col-3">

                      <div className="form-group">
                        <input className="form-input" type="text" id="input-example-1" placeholder="Name" />
                      </div>

                    </div>
                    <div className="column col-3">

                      <div className="form-group">
                        <input className="form-input" type="text" id="input-example-1" placeholder="Name" />
                      </div>

                    </div>
                    <div className="column col-3">

                      <div className="form-group">
                        <input className="form-input" type="text" id="input-example-1" placeholder="Name" />
                      </div>

                    </div>
                    <div className="column col-3">
                      <button className="btn btn-primary">Change Password</button>

                    </div>
                  </div>

                  <div class="divider"></div>

                  {/* ACCOUNT DELETE */}
                  <div className="columns">
                    <div className="column col-12">
                      <h5>Account Deletion</h5>
                    </div>
                    <div className="column col-3 col-ml-auto">
                      <button className="btn btn-error">Delete Account</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS CONTAINER */}
          <div className="container container__user-reviews my-5">
            <div className="columns">
              <div className="column col-12">
                <h2>My Reviews</h2>
              </div>
              <div className="column col-12">
                {
                  userReviews.map((review) => (
                    <ReviewBox review={review}></ReviewBox>
                  ))
                }
              </div>
            </div>
          </div>

        </div>


      </div>
    
      
    )
  }
}

export default AccountPage;