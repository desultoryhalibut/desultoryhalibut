import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from 'victory';

class CentralAxis extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <div className='bar-chart'>
      <svg width={500} height={350}>
        <VictoryChart horizontal
          height={350}
          width={500}
          padding={40}
          domain={{x:[-1.2,1.2], y:[0,7]}}
          style={{
            data: {width: 50},
            labels: {fontSize: 12}
          }}
          padding={{
            top: 20,
            bottom: 60,
            left: 20,
            right: 20
          }}
          domainPadding={{x: 15}}>
          <VictoryAxis
            label="Sentiment"
            orientation="bottom"/>
          <VictoryAxis 
            domain={{y:[0, 5]}}
            tickValues={[-1, -0.75, -0.5, -.25, 0, .25, .50, .75, 1]}
            style={{
              labels: {fontSize: 9},
              grid: {
                stroke: "grey",
                strokeWidth: 1
              },
              axis: {stroke: "transparent"},
              ticks: {stroke: "transparent"}
            }}/>
          <VictoryBar horizontal
            style={{
              data: {
                width: 25,
                labels: { padding: 5, fontSize:10 },
                fill: (data) => data.y > 0 ?
                  "gold" : "blue"
              }
            }}
            data={this.props.data.map(function(obj, idx) {
                
              return {
                x: 1+idx,
                y: + obj.sentimentScore,
                label: obj.newsTopic.toUpperCase()
              }
            })}
          />   
        </VictoryChart>

      </svg>

      // </div>
    );
  }
}

export default CentralAxis;
