import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import ShopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up.component/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

// const TestPage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <button onClick={() => props.history.push('testPage')}>TestPage</button>
//       <Link to='/testPage/'>testPage</Link>
//       <h1>TEST PAGE: {props.match.params.topicId}</h1>
//     </div>
//   )
// }

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
     const userRef = await createUserProfileDocument(userAuth);
       userRef.onSnapshot(snapShot => {
         setCurrentUser({
           id: snapShot.id,
           ...snapShot.data()
         })
       });

    }

    setCurrentUser(userAuth);
  });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage />)}/>
          {/* <Route path='/testPage/:topicId' component={TestPage} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
