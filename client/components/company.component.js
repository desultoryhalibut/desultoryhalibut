import React, { Component } from 'react';
import LineChart from './linechart.component';
import SentimentTrends from './sentiment.component';
import TwitterChart from './twitter.component';

class CompanyComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.companyGoogleTrendsData) {
      return (
        <div>Loading Google Trends data...</div>
      );
    }

    return (
      <div className="container">
        <h2> Company View</h2>

        <div className="row">
          <div className="section-headline col-md-12">
            <h3 className="ta-center">{this.props.currentCompany}</h3>
          </div>
        </div>

        <LineChart
          data={this.props.companyGoogleTrendsData.searchVolume}
          keyword={this.props.companyGoogleTrendsData.keyword}
          x={'date'}
          y={'volume'}
          height={500}
          width={800}
          color={'red'}
        />

      </div>
    );
  }
}

export default CompanyComponent;
