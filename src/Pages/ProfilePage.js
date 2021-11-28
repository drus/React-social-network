import React, { Component } from 'react'
import server from '../scripts/server';
import List from '../components/List'
import Followees from '../components/Followees';
import { getUserId, getUserData } from '../store/user/reducers';
import { connect } from 'react-redux';

class ProfilePage extends Component {

    
    constructor(props){
        super(props);
        this.state={
            name:'',
            followees:[]
        };
        this._unfollow=this._unfollow.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this._updateData(this.props.match.params.id);
        }
    }

    componentDidMount(){
        this._updateData(this.props.match.params.id);
    }
    
    async _updateData(userId){
        const userData=await server.database.getUser(userId);
        this.setState({...userData});
        const userWall=await server.database.getUserWall(userId);
        this.setState({userWall});
    }

    _unfollow(id){
        server.database.unfollowUser(id)
            .then(response=>{
                this.setState({followees:response.followees});
            });
    }


    render() {
        
        const profileImg=this.props.userData ? this.props.userData.picture : `https://i.pravatar.cc/150?u=${this.props.match.params.id}`;
        return (
                <div className="wall-wrapper">
                    {/* <h1 className="page-title">Profile</h1> */}
                    <h1 className="profile-title">
                        <div><img className="profileIconPic" src={profileImg} alt="" /></div>
                        <span>{this.state.name}</span>
                    </h1>
                    <Followees userId={this.props.userId} followees={this.state.followees} unfollowMethod={this._unfollow} />

                    <List datalist={this.state.userWall}></List>
                </div>
        )
    }
}

const MapStateToProps=(state)=>{
    return {userId:getUserId(state), userData:getUserData(state)};
  };
  
  
  export default connect(MapStateToProps)(ProfilePage);
  

/* 
En el perfil se muestran todos los posts que ha publicado el usuario propietario del perfil
un listado de la gente a la que sigue
*/