import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryBar, VictoryAxis, VictoryStack, VictoryLabel, VictoryAnimation } from 'victory';

class TwitterLiveSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      intervals: -1 // units of time from tail to look back and display, decided by user
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event){
    this.setState({intervals: +event.target.value});
  }


  render() {

    if (!this.props.twitterData) {
      return (
        <div>Loading Twitter Volume & Sentiment data...</div>
      );
    }
    // pull sentiment and volume data from x most recent entries, where x = intervals
    var intervals = this.state.intervals;
    var data = this.props.twitterData.map(function(obj, index, collection){
      return {x: index + 1,

              volume: +(obj.data.slice( intervals ).reduce(function(a, b){
                    return a + b.numTweets;
                  }, 0) / -intervals) || 0,

              label: obj.keyword,

              sentiment: +(obj.data.slice( intervals ).reduce(function(a, b){
                    return a + b.sentimentAverage;
                  }, 0) / -intervals) || 0};
    })

    var volumeChart =
    <VictoryChart
      animate={{duration: 5000}}>
      <VictoryAxis
          orientation="bottom"
          tickValues={data.map((obj)=> {return ''})}
          style={{
                ticks: {stroke: "transparent"}
              }}
          />
      <VictoryAxis dependentAxis
          label={"Tweets per Minute"}
          style={{
            grid: {
              stroke: "grey",
              strokeWidth: 1
            },
            axis: {stroke: "transparent"},
            ticks: {stroke: "transparent"}
          }}/>
      <VictoryBar
        height={300}
        style={{
          labels: {fontSize: 10}
        }}
        data={[
          {x: 0.5, y: 0},
          {x: 1, y: data[0].volume, fill: "gold", label: data[0].label},
          {x: 2, y: data[1].volume, fill: "orange", label: data[1].label},
          {x: 3, y: data[2].volume, fill: "tomato", label: data[2].label},
          {x: 4, y: data[3].volume, fill: "pink", label: data[3].label},
          {x: 5, y: data[4].volume, fill: "magenta", label: data[4].label},
          {x: 6, y: data[5].volume, fill: "purple", label: data[5].label},
          {x: 7, y: data[6].volume, fill: "blue", label: data[6].label},
          {x: 8, y: data[7].volume, fill: "teal", label: data[7].label},
          {x: 8.5, y: 0}
        ]}
      />
    </VictoryChart>

    var sentimentChart = <VictoryChart animate={{duration: 5000}}>
                          <VictoryAxis
                              orientation="bottom"
                              tickValues={data.map((obj)=> {return ''})}
                              style={{
                                    axis: {stroke: "transparent"},
                                    ticks: {stroke: "transparent"}
                                  }}
                              />
                          <VictoryAxis dependentAxis
                              tickValues={[-3, -2, -1, 0, 1, 2, 3]}
                              label={"Sentiment Score"}
                              style={{
                                grid: {
                                  stroke: "grey",
                                  strokeWidth: 1
                                },
                                axis: {stroke: "transparent"},
                                ticks: {stroke: "transparent"}
                              }}/>
                          <VictoryBar
                            height={300}
                            style={{
                              labels: {fontSize: 10}
                            }}
                            data={[
                              {x: .5, y: 0},
                              {x: 1, y: data[0].sentiment, fill: "gold", label: data[0].label},
                              {x: 2, y: data[1].sentiment, fill: "orange", label: data[1].label},
                              {x: 3, y: data[2].sentiment, fill: "tomato", label: data[2].label},
                              {x: 4, y: data[3].sentiment, fill: "pink", label: data[3].label},
                              {x: 5, y: data[4].sentiment, fill: "magenta", label: data[4].label},
                              {x: 6, y: data[5].sentiment, fill: "purple", label: data[5].label},
                              {x: 7, y: data[6].sentiment, fill: "blue", label: data[6].label},
                              {x: 8, y: data[7].sentiment, fill: "teal", label: data[7].label},
                              {x: 8.5, y: 0}
                            ]}
                          />
                        </VictoryChart>




    return(
      <div>
        <div className="col-md-6">
        <div className="twitter-live-summary">
            {volumeChart}
        </div>
        </div>
        <div className="col-md-6">
        {sentimentChart}
        </div>
        <div className="btn-containers">
        <button onClick={this.clickHandler} value="-1" className="btn">1 Minute</button>
        <button onClick={this.clickHandler} value="-3" className="btn">3 Minutes</button>
        <button onClick={this.clickHandler} value="-5" className="btn">5 Minutes</button>
        <button onClick={this.clickHandler} value="-10" className="btn">10 Minutes</button>
        </div>
      </div>
    )
  }
}

export default TwitterLiveSummary;
