import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from 'victory';

class CentralAxis extends Component {
  constructor(props) {
    super(props)
  }

  sortedList() {
    let data = this.props.data.sort(function(a,b) {
      return a.sentimentScore > b.sentimentScore ? 1 : -1;
    })
    return data;
  }

  render() {
    return (
      <div className='bar-chart'>
      <svg width={600} height={400}>
       <VictoryChart horizontal
         height={400}
         width={500}
         domainPadding={{x:100}}
         padding={{
           top: 40,
           bottom: 40,
           left: 40,
           right: 40
         }}
         domainPadding={{x: 15}}>
        <VictoryAxis />
         <VictoryBar horizontal
           style={{
             data: {
               width: 20,
               labels: {padding: 5, fontSize: 10},
               fill: (data) => data.y > 0 ?
                 "gold" : "blue"
             }
           }}
           data={this.sortedList().map(function(obj, idx) {
              console.log('obj inside props data is:',obj)
              if (obj.keyword !== 'panic')
              return {
                x: 1+idx,
                y: + obj.sentimentScore,
                label: obj.keyword.toUpperCase()
              }
            })}/>   
       </VictoryChart>

      </svg>

      </div>
    );
  }
}

export default CentralAxis;
