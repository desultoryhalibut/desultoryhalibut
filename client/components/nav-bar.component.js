import React, { Component } from 'react';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(company) {
    this.props.selectCompany(company);
  }

  render() {

    return (
        <nav className="navbar navbar-fixed-top navbar-dark red bg-primary">

            <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapseEx2">
                <i className="fa fa-bars"></i>
            </button>

            <div className="container">
                <div className="collapse navbar-toggleable-xs" id="collapseEx2">
                    <a className="navbar-brand" href="/">MAINSTREET ANALYTICS</a>
                    <ul className="nav navbar-nav">
                      <li className="nav-item"></li>
                    </ul>

                    <form className="form-inline">
                      <input className="form-control" type="text" placeholder="Search Company" />
                    </form>

                    <ButtonToolbar>
                      <DropdownButton title="Select Company" id="dropdown-size-medium">
                        <MenuItem onSelect={this.handleClick} eventKey="Nintendo">Nintendo</MenuItem>
                        <MenuItem onSelect={this.handleClick} eventKey="Disney">Disney</MenuItem>
                        <MenuItem onSelect={this.handleClick} eventKey="Ford">Ford</MenuItem>
                        <MenuItem divider />
                        <MenuItem onSelect={this.handleClick} eventKey="Google">Google</MenuItem>
                        <MenuItem onSelect={this.handleClick} eventKey="Genentech">Genentech</MenuItem>
                      </DropdownButton>
                    </ButtonToolbar>

                </div>

            </div>

        </nav>
    );
  }
}
