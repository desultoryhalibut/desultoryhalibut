import React, { Component } from 'react';
import LineChart from './linechart.component';

class GoogleTrends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentChart: 'car',
      data: this.props.googleTrendsData,
      companyGoogleTrendsData: this.props.companyGoogleTrendsData
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({currentChart: event.target.value});
  }

  renderChart(index, color) {

  }

  render() {
    let partial;

    if (!this.props.googleTrendsData) {
      return (
        <div>Loading Google Trends data...</div>
      );
    }

    if (this.state.currentChart === 'car') {
      partial = <LineChart
        data={this.props.googleTrendsData[0].searchVolume}
        keyword={this.props.googleTrendsData[0].keyword}
        x={'date'}
        y={'volume'}
        height={300}
        width={600}
        color={'pink'}
      />
    } else if (this.state.currentChart === 'hedge') {
      partial = <LineChart
        data={this.props.googleTrendsData[2].searchVolume}
        keyword={this.props.googleTrendsData[2].keyword}
        x={'date'}
        y={'volume'}
        height={300}
        width={600}
        color={'blue'}
      />
    } else if (this.state.currentChart === 'dow jones') {
      partial = <LineChart
        data={this.props.googleTrendsData[1].searchVolume}
        keyword={this.props.googleTrendsData[1].keyword}
        x={'date'}
        y={'volume'}
        height={300}
        width={600}
        color={'orange'}
      />
    }

    return (
<<<<<<< HEAD
      <section className="google-trends">
        <div className="row">
          <div className="col-md-8">
            <nav className="google-trends-nav">
              <button onClick={this.handleClick} value="car" className="btn btn-primary waves-effect">Car</button>
              <button onClick={this.handleClick} value="dow jones" className="btn btn-primary waves-effect">Dow Jones</button>
              <button onClick={this.handleClick} value="hedge" className="btn btn-primary waves-effect">Hedge</button>
            </nav>

            <article>
              {partial}
            </article>
          </div>
=======
      <div className="google-trends-chart">
        <h2>Google Trends Overview</h2>
        <nav className="google-trends-nav">
          <button onClick={this.handleClick} value="car">Car</button>
          <button onClick={this.handleClick} value="dow jones">Dow Jones</button>
          <button onClick={this.handleClick} value="hedge">Hedge</button>
        </nav>
        <article>
          {partial}
        </article>
>>>>>>> master

          <div className="google-summary col-md-4 card card-block">
            <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the <span className="stand-out">1500</span>s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
      </section>
    );
  }

}

export default GoogleTrends;
