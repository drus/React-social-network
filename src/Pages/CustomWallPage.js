/* 
En la home se muestran los posts sin filtrar de todo el mundo
*/
import React, { Component } from 'react'
import List from '../components/List'
import Publish from '../components/Publish'
import server from '../scripts/server';
import { getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class CustomWallPage extends Component {
    state={
        datalist:[]
    }

    constructor(props){
        super(props);
        
        if(this.props.userId){
            this._loadPosts();
        }

    }

    async _loadPosts(){
        const userData=await server.database.getUser(this.props.userId);
        this.setState({...userData});
        

        if(userData.followees && userData.followees.length){
            await server.database.getFolloweesWall(userData.followees)
            .then(datalist=>{
                this.setState({datalist});
            });
        }   
        //store.dispatch(setUserWall(result));
    }
        
    _publishRender(){
        if(this.props.userId){
            return <Publish/>
        }
    }

    render() {
        if(!this.props.userId){
            return <Redirect to="/" />
        }
        return (
            <div className="wall-wrapper">
                <h1 className="page-title">Your taste</h1>
                {this._publishRender()}
                <h2>Topics from your followees</h2>
                <List datalist={this.state.datalist}></List>
            </div>
            )
    }
}

const MapStateToProps=(state)=>{
    return {
        //datalist:getUserWall(state),
        userId:getUserId(state)
    }
};

export default connect(MapStateToProps)(CustomWallPage);
