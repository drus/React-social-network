import React, { Component } from 'react'
import server from '../scripts/server';
import { connect } from 'react-redux';
import { getUserId } from '../store/user/reducers';


class FollowButton extends Component {

    constructor(props) {
        super(props)
    
        this._follow=this._follow.bind(this);
    }
    

    _follow(e){
        server.database.followUser(this.props.followeeId)
        //todo marcar como seguido
        .then(result=>{
            console.log("result", result);
        });
    }

    render() {
        if(!this.props.userId || this.props.userId===this.props.followeeId) return null;

        return (
            <button className="follow-button" onClick={this._follow}>
                <span className="follow-button__count"><span className="visually-hidden">Follow</span></span>
            </button>
        )
    }
}


const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(FollowButton);
  