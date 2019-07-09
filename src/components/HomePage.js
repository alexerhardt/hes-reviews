import React from 'react';
import Header from './Header';
import CourseSearchBox from './CourseSearchBox';

import { autosuggestNameGen } from '../utils/utils-client';

class HomePage extends React.Component {
  render() {
    return (
      <div id="container-homepage" className="container-outer">
        <Header />

        <div className="container-inner container-inner--homepage">
          <section className="section-hero hero-shot">
            <div className="container grid-md text-center v-center">
              <div className="columns">
                <div className="col-md-12 col-8 col-mx-auto">
                  <h1>
                    Course Reviews for <br /> Harvard Extension School
                  </h1>
                  <h5 className="mb-5">
                    Find info on course workloads, difficulty and more!
                  </h5>
                  <div className="course-search-wrapper__home">
                    <CourseSearchBox theme={autosuggestNameGen('home')} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-info bg-gray">
            <div className="container grid-md">
              <div className="columns">
                <div className="col-10 col-mx-auto">
                  <h2 className="text-center">About This Site</h2>
                  <p>
                    Wonder if that Harvard Extension course you're eyeing is any
                    good? Whether you will be able to fit it in your busy
                    schedule? Look no further! Reviews on the site include:
                  </p>
                  <ul>
                    <li>Course ratings</li>
                    <li>Staff ratings</li>
                    <li>Difficulty</li>
                    <li>Weekly courseload estimates</li>
                  </ul>
                  <p>
                    Wanna speak out your mind about a certain course?{' '}
                    <a href="/write-review">Share a review with others!</a>{' '}
                    Reviews can be posted anonymously.
                  </p>
                  <p>
                    The site is open source source and you can contribute to it
                    on GitHub.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-author">
            <div className="container grid-md">
              <div className="columns">
                <div className="col-10 col-mx-auto">
                  <h2 className="text-center">About The Author</h2>
                  <p>
                    This site was made by Alex Erhardt, HES Software Engineering
                    ALM candidate, as a way to give back to the HES community
                    while practicing his coding skills.
                  </p>
                  <p>You can find Alex here:</p>
                  <p>Made in beautiful Madrid, Spain 🇪🇸</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default HomePage;
