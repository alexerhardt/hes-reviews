import React from 'react';
import Header from './Header';

class ReviewsPage extends React.Component
{
  render()
  {
    return (
      <div id="container-reviewspage" className="container-outer">
        <Header />

        <div className="container container-inner container-inner--reviewspage">
          <div className="columns">
            <div className="column col-3 col-stats"></div>
            <div className="column col-9 col-reviews"></div>


          </div>



        </div>

      </div>
    )
  }
}

export default ReviewsPage;