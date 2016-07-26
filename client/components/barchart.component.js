import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryBar, VictoryStack, VictoryAxis, VictoryLabel, VictoryAnimation } from 'victory';

class CentralAxis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sentimentData: null
    }
  }

  sortedList(list) {
    let data = list.sort(function(a,b) {
      return a.sentimentScore > b.sentimentScore ? 1 : -1;
    })
    return data;
  }

  filterByCompany() {
    const economicInd = ['car', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy', 'panic', 'consumer spending']
    let data = this.props.data.filter(function(obj) {
      return (economicInd.indexOf(obj.keyword) === -1)
    })
    return data;
  }

    filterBy(criteria) {
      //by company, by economic indicators, by company

      const economicInd = ['car', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy', 'consumer spending']
      if (criteria === 'company') {
        var data = this.props.data.filter(function(obj) {
          return (economicInd.indexOf(obj.keyword) === -1)
        })
      } else if (criteria === 'economic') {
        var data = this.props.data.filter(function(obj) {
          return (economicInd.indexOf(obj.keyword) > -1)
        });
      } else {
        //need to insert API call to server to get from News database
        var data = this.props.data.filter(function(item) {
          return item.keyword === criteria;
        });
      }
      return data;
    }

  render() {
    var topic = this.props.currentCompany || 'economic';
    console.log("This is the topic: ",topic, this.props.currentCompany );
    return (

      <div className='bar-chart'>


      <svg width={650} height={350}>

       <VictoryChart horizontal
         height={375}
         width={550}
         padding={{
           top: 40,
           bottom: 40,
           left: 40,
           right: 40
         }}
         domainPadding={{x: 15}}

        <VictoryAxis 
          
          orientation='bottom'
          style={{
            axis: {stroke: "transparent"},
            ticks: {stroke: "transparent"}
          }}
        />
         <VictoryBar horizontal
           style={{
             data: {
               width: 20,
               labels: {padding: 10, fontSize: 10},
               fill: (data) => data.y > 0 ?
                 "gold" : "blue"
             }
           }}


           data={this.sortedList(this.filterBy(topic)).map(function(obj, idx) {
              if (obj.keyword !== 'panic') {
                return {
                  x: 1+idx,
                  y: + obj.sentimentScore,
                  label: obj.keyword.toUpperCase()
                }
              } else return {
                x: idx,
                y: 0
              }

            })}

          /> 

       </VictoryChart>

      </svg>

      </div>
    );
  }
}

export default CentralAxis;
