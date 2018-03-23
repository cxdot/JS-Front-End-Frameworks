import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Courses from './containers/Courses/Courses';
// import Course from './containers/Course/Course';
import Users from './containers/Users/Users';
import './App.css';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <ul>
              <li><NavLink to="/users" style={{textDecoration: 'none'}}>Users</NavLink></li>
              <li><NavLink to="/courses" style={{ textDecoration: 'none' }}>Courses</NavLink></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/users" component={Users} />
            {/* <Route path="/courses/:id" component={Course} /> */}
            <Route path="/courses" component={Courses} />
            <Redirect from="/all-courses" to="/courses" />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
