import React, { Component } from 'react';
import GoogleTrends from './googletrends.component';

import TwitterChart from './twitter.component';
import TwitterLiveSummary from './twitter-live-summary.component';
import TwitterLive from './twitter-live.component';

class SummaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleTrendsData: null,
      newsData: null,
      sentimentData: null,
      twitterData: null
    };

    this.fetchTweets = this.fetchTweets.bind(this);
  }

  fetchTweets () {
    var self = this;
      fetch('api/twitter', {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('SETTINGSTATE', data);
        this.setState({twitterData: data}).bind(self);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillMount() {
    fetch('api/googletrends', {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({googleTrendsData: data});
        console.log('Google Trends Data ', data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch('api/news', {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({sentimentData: data});

      })
      .catch((err) => {
        console.log(err);
      });

  }

  render() {

    return (

      <div>
        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center"><i className="fa fa-twitter" aria-hidden="true"></i>What's Tweeting</h3>
          </div>
          <TwitterLiveSummary twitterData={this.props.twitterData} currentCompany={this.state.currentCompany}/>
        </div>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">What's Being Searched</h3>
          </div>
        </div>

        <GoogleTrends googleTrendsData={this.state.googleTrendsData} companyGoogleTrendsData={this.props.companyGoogleTrendsData}/>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">Sentiment Analysis in Financial News</h3>
          </div>
        </div>

        <div className="SImg">
        </div>
    </div>
    );
  }
}

export default SummaryComponent;
