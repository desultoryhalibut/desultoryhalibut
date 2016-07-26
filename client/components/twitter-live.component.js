import React, { Component } from 'react';

// This component looks at the most recent time interval
// and renders an image based on + - neutral sentiment

// Twitter is feeling
//   {image}
// about {search} right this minute
class TwitterLive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.twitterData,  // score of most recent interval...use same data as twitter.component,,
      currentQuery: this.props.currentCompany           // search query or item chosen from dropdown
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event){
    this.setState({currentQuery: event.target.value});
  }


  render() {
    if (!this.props.twitterData || !this.props.currentCompany) {
      return (
        <div>Loading Twitter Volume data...for Bullish/Bearish/Neutral component</div>
      );
    }

    var currentQuery = this.state.currentQuery;
    var company = this.props.twitterData.filter(function(obj) {
      return (obj.keyword === currentQuery) ? true : false;
    })[0];

    var sentiment = company.data[company.data.length - 1].sentimentAverage;
    var numTweets = company.data[company.data.length - 1].numTweets;

    // Idea: create smaller trailing graphics -- neutral Bullish BULLISH
    // var sentiment2 = company.data[company.data.length - 2].sentimentAverage;
    // var numTweets2 = company.data[company.data.length - 2].numTweets;
    // var sentiment3 = company.data[company.data.length - 3].sentimentAverage;
    // var numTweets3 = company.data[company.data.length - 3].numTweets;

    var graphic;
    if (sentiment > 0.5) {
      // bullish
      graphic = <img src={'http://bit.ly/2adciRq'} className="img-responsive"/>
    } else if (sentiment < -0.5){
      // bearish
      graphic = <img src={'http://bit.ly/2a0Yese'} className="img-responsive"/>
    } else {
      // neutral
      graphic = <img src={'http://bit.ly/2a0hubG'} className="img-responsive"/>
    }

    return(
          <div className="col-md-8">
            <div className="twitter-live">
              {graphic}
              <h4><strong>{numTweets} tweets @ {Math.round(sentiment * 100) / 100} average sentiment</strong></h4>

            </div>
          </div>
        );
}

}

export default TwitterLive;

{/*<div>
  <button onClick={this.clickHandler} value="nintendo" className="btn">nintendo</button>
  <button onClick={this.clickHandler} value="google" className="btn">google</button>
  <button onClick={this.clickHandler} value="disney" className="btn">disney</button>
  <button onClick={this.clickHandler} value="ford" className="btn">ford</button>
  <button onClick={this.clickHandler} value="genentech" className="btn">genentech</button>
  <button onClick={this.clickHandler} value="negative" className="btn">negative</button>
  <button onClick={this.clickHandler} value="markets" className="btn">markets</button>
  <button onClick={this.clickHandler} value="gold" className="btn">gold</button>
</div>*/}
