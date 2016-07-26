import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryBar, VictoryAxis, VictoryArea } from 'victory';

class TwitterChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.twitterData,
      currentQuery: this.props.currentCompany   // may want to add adjustable time interval here
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event){
    this.setState({currentQuery: event.target.value});
  }

  getStyles() {
    return {
      parent: {
        boxSizing: "border-box",
        display: "block",
        width: "75%",
        height: "65%",
        padding: 20
      }
    };
  }

  render() {

    if (!this.props.twitterData || !this.props.currentCompany) {
      return (
        <div>Loading Twitter data for detail view component!</div>
      );
    }

    var currentQuery = this.state.currentQuery;
    var company = this.props.twitterData.filter(function(obj) {
      return (obj.keyword === currentQuery) ? true : false;
    })[0];

    var data = company.data.map(function(obj, index, array) {
      return {time: index,
              numTweets: obj.numTweets || 0,
              sentimentAverage: (obj.sentimentAverage * 5) || 0}
    });

    const styles = this.getStyles();
    var chart = <VictoryChart animate={{duration: 5000}}>

                 <VictoryArea
                   interpolation="cardinal"
                   style={{
                       data: {fill: "tomato"}
                     }}
                   data={data.slice(-20)}
                   x={"time"}
                   y={"numTweets"}
                 />

              <VictoryLine
                interpolation="cardinal"
                style={{
                  data: {
                    stroke: "cornflowerblue",
                    strokeWidth: 5
                  },
                  labels: {fontSize: 8}
                }}
                data={data.slice(-20)}
                x={"time"}
                y={"sentimentAverage"}
                label="Sentiment Score"
                standalone={false}
                fill={"teal"}
              />
            </VictoryChart>

    return(
      <div>
        <div>{chart}</div>
      </div>
    )
  }
}

export default TwitterChart;
