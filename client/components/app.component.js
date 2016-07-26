import React, { Component } from 'react';
import SummaryComponent from './summary.component';
import CompanyComponent from './company.component';
import NavBar from './nav-bar.component';
import Footer from './footer.component';

export default class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCompany: null,
      companyGoogleTrendsData: null,
      isSummary: true,
      sentimentData : null,
      twitterData: null
    }
    this.selectCompany = this.selectCompany.bind(this);
    this.fetchTweets = this.fetchTweets.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  selectCompany(company) {
    this.setState({currentCompany: company.toLowerCase(), isSummary: false});

    //fetch company specific Google Trends data directly from API
    fetch('api/googletrends/' + company, {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({companyGoogleTrendsData: data});
      })
      .catch((err) => {
        console.log(err);
      });
  }


  fetchTweets () {
    var self = this;
      fetch('api/twitter', {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('SETTINGSTATE', data);
        this.setState({twitterData: data}).bind(self);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  getNews() {
  fetch('api/news', {method: 'GET'})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.setState({sentimentData: data});

    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentWillMount() {
    this.getNews();
    setInterval(this.fetchTweets, 5000);
  }

  render() {
    var partial;
    if (this.state.isSummary) {
      partial = <SummaryComponent twitterData={this.state.twitterData} sentimentData={this.state.sentimentData} />
    } else {
      partial = <CompanyComponent companyGoogleTrendsData={this.state.companyGoogleTrendsData} currentCompany={this.state.currentCompany} twitterData={this.state.twitterData} sentimentData={this.state.sentimentData} />
    }

    return (
      <div>
        <header>
          <NavBar selectCompany={this.selectCompany}/>
        </header>

        <div className="main-content z-depth-5">
          <h1><strong>Mainstreet INSIGHTS</strong></h1>
          {partial}

        </div>
        <Footer />
      </div>
    );
  }
}
