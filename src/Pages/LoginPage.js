import React, { Component } from 'react'
import Login from '../components/Login'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserId } from '../store/user/reducers';
import * as PATHS from '../Paths'


class LoginPage extends Component {
    render() {

        if(this.props.userId){
            return (
              <Redirect to={PATHS.ROOT_PATH}/>
            )
          }

        return (
          <div className="form-wrapper">
                <Login />
                <Link to="/signin">Create an account</Link>
            </div>
        )
    }
}



const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(LoginPage);