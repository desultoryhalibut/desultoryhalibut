import React, { Component } from 'react';
import GoogleTrends from './googletrends.component';
import SentimentTrends from './sentiment.component';
import TwitterChart from './twitter.component';

class CompanyComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container">
        <h2> Company View</h2>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center"><i className="fa fa-twitter" aria-hidden="true"></i>What's Tweeting</h3>
          </div>
        </div>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">What's Being Searched</h3>
          </div>
        </div>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">Market Sentiment</h3>
          </div>
        </div>

      </div>
    );
  }
}

export default CompanyComponent;
