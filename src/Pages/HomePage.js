/* 
En la home se muestran los posts sin filtrar de todo el mundo
*/

import React, { Component } from 'react'
import List from '../components/List'
import Publish from '../components/Publish'
import server from '../scripts/server';
import { getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';

class HomePage extends Component {
    state={
        datalist:[]
    }

    constructor(props){
        super(props);
        this._loadPosts=this._loadPosts.bind(this);
        this._loadPosts();
    }

    async _loadPosts(){
        const datalist=await server.database.getCollection('topics');
        this.setState({datalist});
        //store.dispatch(setUserWall(result));
    }

        
    _publishRender(){
        if(this.props.userId){
            return <Publish publishCallback={this._loadPosts}/>
        }
    }

    render() {
        return (
            <div className="wall-wrapper">
                {this._publishRender()}
                <List datalist={this.state.datalist} deleteCallback={this._loadPosts}></List>
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

export default connect(MapStateToProps)(HomePage);

