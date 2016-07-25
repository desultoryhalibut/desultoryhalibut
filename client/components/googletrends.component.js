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

  renderLineChart(index, color) {
    return <LineChart
      data={this.props.googleTrendsData[index].searchVolume}
      keyword={this.props.googleTrendsData[index].keyword}
      x={'date'}
      y={'volume'}
      height={300}
      width={600}
      color={color}
    />;
  }

  render() {
    let partial;

    if (!this.props.googleTrendsData) {
      return (
        <div>Loading Google Trends data...</div>
      );
    }

    if (this.state.currentChart === 'car') {
      partial = this.renderLineChart(0, 'red');

    } else if (this.state.currentChart === 'hedge') {
      partial = this.renderLineChart(2, 'blue');

    } else if (this.state.currentChart === 'dow jones') {
      partial = this.renderLineChart(1, 'green');

    } else if (this.state.currentChart === 'unemployment') {
      partial = this.renderLineChart(3, 'yellow');

    } else if (this.state.currentChart === 'panic') {
      partial = this.renderLineChart(4, 'orange');

    } else if (this.state.currentChart === 'real estate agent') {
      partial = this.renderLineChart(5, 'black');

    } else if (this.state.currentChart === 'inflation') {
      partial = this.renderLineChart(6, 'gray');

    } else if (this.state.currentChart === 'restaurant') {
      partial = this.renderLineChart(7, 'pink');
    }

    return (
      <section className="google-trends">
        <div className="row quote">
          <quote>"Research published today in Nature Scientific Reports finds that <span className="stand-out">Google search behaviour</span> is not only a clear indicator of movements in the market; it also <span className="stand-out">gives insight into the likely future behaviour of economic actors</span>."</quote> <small>~ Nature.com: Quantifying Trading Behavior in Financial Markets Using Google Trends</small>
        </div>
        <div className="row">
          
          <div className="col-md-8">
            <nav className="google-trends-nav">
              <button onClick={this.handleClick} value="car" className="btn btn-warning btn-rounded waves-effect">Car</button>
              <button onClick={this.handleClick} value="dow jones" className="btn btn-warning btn-rounded waves-effect">Dow Jones</button>
              <button onClick={this.handleClick} value="hedge" className="btn btn-warning btn-rounded waves-effect">Hedge</button>
              <button onClick={this.handleClick} value="panic" className="btn btn-warning btn-rounded waves-effect">Panic</button>
              <button onClick={this.handleClick} value="unemployment" className="btn btn-warning btn-rounded waves-effect">Unemployment</button>
              <button onClick={this.handleClick} value="real estate agent" className="btn btn-warning btn-rounded waves-effect">Real Estate Agent</button>
              <button onClick={this.handleClick} value="inflation" className="btn btn-warning btn-rounded waves-effect">Inflation</button>
              <button onClick={this.handleClick} value="restaurant" className="btn btn-warning btn-rounded waves-effect">Restaurant</button>
            </nav>

            <article>
              {partial}
            </article>
          </div>

          <div className="col-md-4">
            <div className="card">
                <h3 className="card-header red white-text">What are we looking at?</h3>
                <div className="card-block">
                    <h4 className="card-title">Google search trends can help you get a pulse on economic and market indicators</h4>
                    <p className="card-text">
                      <ul>
                        <li><strong>Cars & Restaurants</strong>: Pulse on consumer spending</li>
                        <li><strong>Real Estate Agent</strong>: Pulse on housing market demand</li>
                        <li><strong>Unemployment</strong>: Pulse on jobs</li>
                        <li><strong>Inflation</strong>: Pulse on inflation</li>
                        <li><strong>Dow Jones</strong>: Pulse on market volatility</li>
                        <li><strong>Hedge & Panic</strong>: Pulse on market fear</li>
                      </ul>
                    </p>
                </div>
            </div>
          </div>

        </div>
        
        <div className="row">
          
          <div className="card card-danger text-xs-center z-depth-2 col-md-3 infobox">
            <div className="card-block">
              <p className="white-text"><span className="stand-out-white">6% increase in searches for "restaurant" from May 2016 to June 2016</span></p>
            </div>
          </div>
          
          <div className="card card-warning text-xs-center z-depth-2 col-md-3 infobox">
            <div className="card-block">
              <p className="white-text"><span className="stand-out-white">6% increase in searches for "restaurant" from May 2016 to June 2016</span></p>
            </div>
          </div>
          
          <div className="card card-info text-xs-center z-depth-2 col-md-3 infobox">
            <div className="card-block">
              <p className="white-text"><span className="stand-out-white">6% increase in searches for "restaurant" from May 2016 to June 2016</span></p>
            </div>
          </div>


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
