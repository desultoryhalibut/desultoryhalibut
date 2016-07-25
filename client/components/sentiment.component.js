import React, { Component } from 'react';
import LineChart from './linechart.component';
import CentralAxis from './barchart.component';
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis } from 'victory';

class SentimentTrends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.sentimentData,
      current: 'disney'
    }
  }


  render() {
    if (!this.props.sentimentData) {
      return (
        <p>Loading Sentiment Data...</p>
      );
    }

    return (


      <section className="sentiments">
        <div className="row quote">
          <quote>In simulated trading experiments, average returns based on predictions from <span className='stand-out'>news sentiment scores outperformed </span>that of well-known trading experts.</quote> <small>~ Schumaker and Chen: A Quantitive Stock Prediction System Based on Financial News </small>
        </div>
        <div className="center-content">
          <div className="row">
            <h4><strong> 2016 News Headlines</strong></h4>
            <div className="col-md-8">
              <div className="sentiment-chart">
              
                <CentralAxis
                  data={this.props.sentimentData}
                  label={'keyword'}
                  y={'sentimentScore'}
                  x={1}
                  height={400}
                  width={600}
                />
              </div>
            </div>



            <div className="col-md-4">
              <div className="card">
                <h3 className="card-header red white-text">Company Details</h3>
                <div className="card-block">
                  <h4 className='card-title'>
                    {this.props.sentimentData[9].keyword.toUpperCase()}
                  </h4>
                  <p className='card-text'>
                   <ul>
                     <li><strong># Articles: </strong>{this.props.sentimentData[9].hits + '\n'}</li>
                     <li><strong>Sentiment Score: </strong>{this.props.sentimentData[9].sentimentScore + '\n'}</li>
                     <li><strong>Headlines: </strong>{this.props.sentimentData[9].data[0].headline.print_headline + '\n'}
                     
                    </li>
                   </ul>
                    
                    
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}


export default SentimentTrends;
