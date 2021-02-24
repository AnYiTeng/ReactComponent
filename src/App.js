import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import routers from './router'
import HomePage from './page/home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {
            routers.map((route) => {
              return (
                <Route exact key={route.path} path={route.path} component={route.component} />
              )
            })
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
