import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component'

const TestPage = (props) => {
  console.log(props);
  return (
    <div>
      <button onClick={() => props.history.push('testPage')}>TestPage</button>
      <Link to='/testPage/'>testPage</Link>
      <h1>TEST PAGE: {props.match.params.topicId}</h1>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/testPage/:topicId' component={TestPage} />
      </Switch>
    </div>
  );
}

export default App;
