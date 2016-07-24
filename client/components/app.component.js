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
      isSummary: true
    }
    this.selectCompany = this.selectCompany.bind(this);
  }

  selectCompany(company) {
    this.setState({currentCompany: company, isSummary: false});
    alert(`I selected this company ${company}`);

    // fetch company specific Google Trends data
    fetch('api/googletrends/' + company, {method: 'GET'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('Company Google Trends Data ', data);
        this.setState({companyGoogleTrendsData: data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let partial;
    if (this.state.isSummary) {
      partial = <SummaryComponent />
    } else {
      partial = <CompanyComponent />
    }

    return (
      <div>
        <header>
          <NavBar selectCompany={this.selectCompany}/>
        </header>

        <div className="main-content z-depth-5">

          {partial}
        </div>
        <Footer />
      </div>
    );
  }
}
