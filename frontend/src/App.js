import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Dashboard from './components/Dashboard'; // The next page you want to navigate to after login
import SignUp from './components/Sign_up';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
      </Switch>
    </Router>
  );
};

export default App;

