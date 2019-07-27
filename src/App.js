import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './App.css';

import ShopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up.component/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
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

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
     const userRef = await createUserProfileDocument(userAuth);
       userRef.onSnapshot(snapShot => {
         this.setState({
           currentUser: {
             id: snapShot.id,
             ...snapShot.data() 
           }
         }
         );
       });

    }

    this.setState({ currentUser: userAuth });
  });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage} />
          <Route path='/testPage/:topicId' component={TestPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
