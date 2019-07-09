import React from 'react';
import Header from './Header';
import ReviewBox from './ReviewBox';

// import ReviewData from '../data/review-data.json';
// const userReviews = ReviewData.slice(0, 9);

class AccountPage extends React.Component {
  state = {
    reviews: [],
  };

  render() {
    return (
      <div id="container-accountpage" className="bg-gray">
        <Header />

        <div className="container container-inner container-inner__accountpage">
          {/* ACCOUNT OPTIONS CONTAINER */}
          <div className="container container__password-options my-5">
            <div className="columns">
              <div className="column col-12">
                <h2>Account Options</h2>
              </div>

              <div className="column col-12">
                <div className="card p-4">
                  {/* PASSWORD CHANGE FORM
                      Bottom margins go on each of the form elements instead of
                      the entire row - this is so there is vertical spacing
                      in both mobile and desktop
                   */}
                  <div className="columns">
                    <div className="column col-12">
                      <h5>Password Change</h5>
                    </div>

                    <div className="column col-3 col-md-12 mb-3">
                      <div className="form-group">
                        <input
                          className="form-input"
                          type="text"
                          id="input-example-1"
                          placeholder="Old password"
                        />
                      </div>
                    </div>
                    <div className="column col-3 col-md-12 mb-3">
                      <div className="form-group">
                        <input
                          className="form-input"
                          type="text"
                          id="input-example-1"
                          placeholder="New password"
                        />
                      </div>
                    </div>
                    <div className="column col-3 col-md-12 mb-3">
                      <div className="form-group">
                        <input
                          className="form-input"
                          type="text"
                          id="input-example-1"
                          placeholder="Confirm new"
                        />
                      </div>
                    </div>
                    <div className="column col-3 col-md-12 mb-3">
                      <button className="btn btn-primary btn__account-opt">
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="divider mb-3" />

                  {/* ACCOUNT DELETE */}
                  <div className="columns">
                    <div className="column col-12">
                      <h5>Account Deletion</h5>
                    </div>
                    <div className="column col-9 col-md-12">
                      <p>
                        All your reviews and account details will be erased.
                      </p>
                    </div>
                    <div className="column col-3 col-md-12">
                      <button className="btn btn-error btn__account-opt">
                        Delete Account
                      </button>
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
                {this.state.reviews.map(review => (
                  <ReviewBox review={review} showEditOptions />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
