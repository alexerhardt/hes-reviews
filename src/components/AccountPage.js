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
                <h2>Password Options</h2>
              </div>

              <div className="column col-12">
                <div className="card">
                  Three inputs here
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