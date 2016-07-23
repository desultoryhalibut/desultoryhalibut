import React, { Component } from 'react';
import LineChart from './linechart.component';
import CentralAxis from './barchart.component';
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis } from 'victory';

class SentimentTrends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.sentimentData,
      xAxis: 1
    }
  }


  render() {
    console.log('props:',this.props.sentimentData)
    if (!this.props.sentimentData) {
      return (
        <p>Loading Sentiment Data...</p>
      );
    }

    return (
      <div className="sentiment-chart">
        <h2>Consumer/Economic Sentiment - News in Past Two Months</h2>
        <CentralAxis 
          data={this.props.sentimentData}
          x={'newsTopic'}
          y={'sentimentScore'}
          height={300}
          width={500}
        />

      </div>
    )
  }

}


export default SentimentTrends;
