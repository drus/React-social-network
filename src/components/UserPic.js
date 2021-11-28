import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUserProfileLink } from '../scripts/utils'

export default class UserPic extends Component {

    state={
        profileImg:'/default-profile-icon.png',//`https://i.pravatar.cc/150?u=${this.props.userId}`,
        profileLink:''//getUserProfileLink(this.props.userId)
    }
    
    componentDidMount(){
        //console.log("UserPic props", this.props);
        if(this.props.userId){
            this._updateState();
        }
    }

    

    componentDidUpdate(prevProps){
        if(prevProps.userId!== this.props.userId || prevProps.userData!==this.props.userData){
            this._updateState()
        }
    }

    _updateState(){
        //console.log("this.props.userData && this.props.userData.picture", this.props.userData && this.props.userData.picture);
        let newState={
            //profileImg:`https://i.pravatar.cc/150?u=${this.props.userId}`,
            profileLink:getUserProfileLink(this.props.userId)
        };
        if(this.props.userData && this.props.userData.picture){
            newState.profileImg=this.props.userData.picture;
        }
        
        this.setState(newState);
    }

    render() {

        return (
            <Link to={this.state.profileLink}>
                <img className="profileIconPic" src={this.state.profileImg} alt="" />
            </Link>
        )
    }
}
