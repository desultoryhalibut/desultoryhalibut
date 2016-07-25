import React, { Component } from 'react';
import GoogleTrends from './googletrends.component';
import SentimentTrends from './sentiment.component';
import NewsTrends from './news.component';

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

      ////////NEWS VOLUME////////
    // fetch('api/news', {method: 'GET'})
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     this.setState({newsData: data});
    //
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });


    //////NEWS SENTIMENT////////
    fetch('api/news/sentiment', {method: 'GET'})
      .then((res) => {
        //console.log('fetch is working. Response:',res)
        return res.json();
      })
      .then((data) => {
        this.setState({sentimentData: data});

      })
      .catch((err) => {
        console.log(err);
      });

    fetch('api/twitter', {method: 'GET'})
      .then((res) => {
        // console.log('twitter fetch working. Response:',res)
        return res.json();
      })
      .then((data) => {
        this.setState({twitterData: data});
      })
      .catch((err) => {
        console.log(err);
      });

  }

  componentDidMount(){
    setInterval(this.fetchTweets, 10000);
  }



  render() {

    return (

      <div className="container">
        <img className="header-image" src="http://previews.123rf.com/images/ashdesign/ashdesign1010/ashdesign101000010/8127340-3D-Stock-Market-Data-Blue-Background-Stock-Photo.jpg" alt="Main Street Analytics"/>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center"><i className="fa fa-twitter" aria-hidden="true"></i>What's Tweeting</h3>
            <TwitterLiveSummary twitterData={this.state.twitterData} currentCompany={this.state.currentCompany}/>
            <TwitterChart twitterData={this.state.twitterData} currentCompany={this.state.currentCompany}/>
            <TwitterLive twitterData={this.state.twitterData} currentCompany={this.state.currentCompany}/>
          </div>
        </div>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">What's Being Searched</h3>
          </div>
        </div>

        <GoogleTrends googleTrendsData={this.state.googleTrendsData} companyGoogleTrendsData={this.props.companyGoogleTrendsData}/>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">Market Sentiment</h3>
          </div>
        </div>

        <SentimentTrends sentimentData={this.state.sentimentData} currentCompany={this.state.currentCompany}/>

        <div className="row">
          <div className="footer-top col-md-12">

          </div>
          <div className="footer col-md-12">
            Footer text goes here
          </div>
        </div>
      <div>
        <NewsTrends newsData={this.state.newsData} />
      </div>
    </div>
    );
  }
}

export default SummaryComponent;
