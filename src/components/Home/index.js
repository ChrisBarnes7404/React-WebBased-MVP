import React from 'react';
import { compose } from 'recompose';
import { Tabs, Tab } from 'react-bootstrap';
import '../App/index.css';

import { withAuthorization, withEmailVerification } from '../Session';

import Reports from '../Reports';
import Companies from '../Companies';

const HomePage = () => (
  <div>
    <div className="jumbotron paral paralsec">
      <h1 className="display-8 text-center">Home</h1>
    </div>
    <div className="tab-wrapper">
      <div className="container">
        <div className="row">
          <Tabs
            defaultActiveKey="companies"
            className="non-nav"
            variant="pills"
          >
            <Tab eventKey="companies" title="Companies">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Companies List</h4>
                <Companies />
              </div>
            </Tab>
            <Tab eventKey="reports" title="Reports">
              <div className="tab-item-wrapper">
                <h4 className="text-center">Reports List</h4>
                <Reports />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
