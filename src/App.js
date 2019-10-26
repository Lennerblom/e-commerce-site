import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import ShopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up.component/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    //  ADDING SHOP DATA TO FIREBASE  const {setCurrentUser, collectionsArray} = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    // if(userAuth){
    //  const userRef = await createUserProfileDocument(userAuth);
    //    userRef.onSnapshot(snapShot => {
    //      setCurrentUser({
    //        id: snapShot.id,
    //        ...snapShot.data()
    //      })
    //    });
    // }

    // setCurrentUser(userAuth);
  //   addCollectionsAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })))
      // });
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
