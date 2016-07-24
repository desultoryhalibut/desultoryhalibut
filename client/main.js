import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import AppComponent from './components/app.component';
import CompanyComponent from './components/company.component';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={AppComponent}>
        <Route path="home" component={AppComponent} />
        <Route path="company" component={CompanyComponent} />
      </Route>
    </Router>
  ), document.getElementById('mainstreet'));
});

// React.createElement(AppComponent),
