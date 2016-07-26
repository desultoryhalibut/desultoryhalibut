import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis } from 'victory';

// LineChart component to be reused for Google Trends chart


class LineChart extends Component {

  constructor(props) {
    super(props);
  }

  computeDomain() {
    let volumeArray = this.props.data.map(item => {
      return item['volume'];
    });
    let max = Math.max.apply(null, volumeArray);
    let min = Math.min.apply(null, volumeArray);

    return [min, max];
  }

  render() {
    return (

      <div>
        <h4><strong>Google searches for "{this.props.keyword}" 2004 - present</strong></h4>
        <svg width={this.props.width} height={this.props.height}>

          <VictoryLine
            data={this.props.data}
            x={this.props.x}
            y={(data) => data.volume}
            label={this.props.keyword}
            height={this.props.height}
            interpolation={'cardinal'}
            width={this.props.width}
            standalone={false}
            style={{
              data: {
                stroke: this.props.color,
                strokeWidth: 3
              }
            }}
          />

          <VictoryAxis
            height={this.props.height}
            width={this.props.width}
            tickValues={[
              '2004',
              '2006',
              '2008',
              '2010',
              '2012',
              '2014',
              '2016'
            ]}
            standalone={false}
          />
          <VictoryAxis dependentAxis
            height={this.props.height}
            width={this.props.width}
            label="Volume"
            standalone={false}
            domain={this.computeDomain()}
            scale={"linear"}
            style={{
              grid: {
                stroke: "grey",
                strokeWidth: 1
              }
            }}
          />
        </svg>

      </div>
    );
  }

}

export default LineChart;
