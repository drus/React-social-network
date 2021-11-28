import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserId, getUserData } from '../store/user/reducers'
import UserPic from './UserPic'
import UserName from './UserName'
import * as PATHS from '../Paths'
import server from '../scripts/server'
import store from '../store'
import { setUserId, setUserData } from '../store/user/actions'

class Header extends Component {

    constructor(props) {
        super(props)
    
        this._onClickSignOut=this._onClickSignOut.bind(this);
    }
    

    _onClickSignOut(){
        server.auth.logout();
        store.dispatch(setUserId(null));
        store.dispatch(setUserData(null));
        return false;
    }


    render() {
        //const profileLink=`/profile/${this.props.userId}`;
        //const username=this.props.userData ? this.props.userData.name : ':)';

        if(!this.props.userId){
            return (
                <header className="app-header">
                    <Link to={PATHS.ROOT_PATH} className="logo"> </Link>
                    <div>
                        <Link className="link" to="/signin">Sign In</Link>
                        <Link className="link" to="/login">Log In</Link>
                    </div>
                </header>
            )

        }else{

            return (
                <header className="app-header">
                    <Link to={PATHS.ROOT_PATH} className="logo"> </Link>
    
                    <div className="user-status">
                        <UserPic userId={this.props.userId} userData={this.props.userData} />
                        <UserName userId={this.props.userId} userName={this.props.userData ? this.props.userData.name : ''}/>
                        <button onClick={this._onClickSignOut} className="sign-out-button">Logout</button>
                    </div>
                </header>
            )
        }
        
    }

}


const MapStateToProps=(state)=>{
    return {userId:getUserId(state), userData:getUserData(state)};
  };
  
  
  export default connect(MapStateToProps)(Header);