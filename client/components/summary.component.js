import React, { Component } from 'react';
import GoogleTrends from './googletrends.component';
import SentimentTrends from './sentiment.component';
import NewsTrends from './news.component';
import TwitterChart from './twitter.component';

class SummaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleTrendsData: null,
      newsData: null,
      sentimentData: null
    };

  }

  componentWillMount() {
    fetch('api/googletrends', {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({googleTrendsData: data});
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
        <TwitterChart />
        <GoogleTrends googleTrendsData={this.state.googleTrendsData} />
        <SentimentTrends sentimentData={this.state.sentimentData} />
        <NewsTrends newsData={this.state.newsData} />
      </div>
    );
  }
}

export default SummaryComponent;
