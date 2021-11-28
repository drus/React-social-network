import React, { Component } from 'react'
import SignIn from '../components/SignIn'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId } from '../store/user/reducers';
//import * as PATHS from '../Paths'
import { EDIT_PROFILE_PATH } from '../Paths';


class SignInPage extends Component {
    render() {
        if(this.props.userId){
            return (
              <Redirect to={EDIT_PROFILE_PATH} />
            )
          }
        return (
          <div className="form-wrapper">
                <SignIn />
                <Link to="/login" >I have an account</Link>
            </div>
            )
    }
}


const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(SignInPage);