import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserId, getUserData } from './store/user/reducers';

import AppRouter from './AppRouter';
import Navigation from './components/Navigation';
import Header from './components/Header';
import store from './store';
import { setUserData } from './store/user/actions'
import server from './scripts/server';


class App extends Component {

  /* constructor(props) {
    super(props)
  

  } */


  componentDidMount(prevProps) {
    if (this.props.userId) {
      server.database.getUser(this.props.userId)
        .then((userdata) => {
          store.dispatch(setUserData(userdata));
          return server.storage.downloadImage(this.props.userId, 'profilePictures');
        })
        .then(picture => {
          //console.log("picture", picture);
          store.dispatch(setUserData( {...this.props.userData,picture:picture}));
        });
    }
  }


  render() {


    return (
      <div>

        <Header userName userData />

        <AppRouter />

        <Navigation />

      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    userId: getUserId(state),
    userData:getUserData(state)
  };
};




export default connect(MapStateToProps)(App);
