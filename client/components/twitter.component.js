import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryBar, VictoryAxis, VictoryArea } from 'victory';

class TwitterChart extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.twitterData,
      currentQuery: 'ford'   // may want to add adjustable time interval here
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
    // return (
    //     <section className="twitter-component">
    //       <div className="row">
    //         <div className="col-md-8">
    //           <VictoryChart />
    //         </div>
    //         <div className="trends col-md-4">
    //           <div className="row">
    //             <article className="orange col-sm-6">
    //               <span className="">796</span>
    //               <p>Tweets around the world</p>
    //             </article>
    //             <article className="red col-sm-6">
    //               <span className="">Sad</span>
    //               <p>Overall feeling</p>
    //             </article>
    //           </div>

    //           <div className="row">
    //             <article className="brown col-sm-6">
    //               <p>Some interesting content</p>
    //               <span className=""></span>
    //             </article>
    //             <article className="gray col-sm-6">
    //               <p>Some interesting content</p>
    //               <span className=""></span>
    //             </article>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    // );

    if (!this.props.twitterData) {
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
        <div>Twitter Detail Component</div>
        <div>{chart}</div>
        <div>      
          <button onClick={this.clickHandler} value="nintendo">nintendo</button>
          <button onClick={this.clickHandler} value="google">google</button>
          <button onClick={this.clickHandler} value="disney">disney</button>
          <button onClick={this.clickHandler} value="ford">ford</button>
          <button onClick={this.clickHandler} value="genentech">genentech</button>
          <button onClick={this.clickHandler} value="negative">negative</button>
          <button onClick={this.clickHandler} value="markets">markets</button>
          <button onClick={this.clickHandler} value="gold">gold</button>
        </div>
      </div>
    )
  }
}

export default TwitterChart;

