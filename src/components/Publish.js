import React, { Component } from 'react'
import Server from '../scripts/server';
import { getUserId } from '../store/user/reducers';
import { getUserData } from '../store/user/reducers';
import { connect } from 'react-redux';
import UserPic from './UserPic';
//import store from '../store';

const defaultState={
    content:'',
    date:''
};

class Publish extends Component {

    state={...defaultState};

    constructor(props){
        super(props);
        this._onChange=this._onChange.bind(this);
        this._onPublishClick=this._onPublishClick.bind(this);
        this._onFocus=this._onFocus.bind(this);
        this._onBlur=this._onBlur.bind(this);
    }

    _onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    _onFocus(e){
        this.setState({
            focus:true
        })
    }
    _onBlur(e){
        setTimeout(() => {
            this.setState({
                focus:false
            })
            
        }, 200);
    }

    _onPublishClick(e){
        Server.database.setTopic({
            //title:this.state.title,
            content:this.state.content,
            date:new Date(),
            authorId: this.props.userId,
            authorName:this.props.userData.name
        })
        .then(response=>{
            console.log("setTopic response: ", response);
            if(response.id){
                this.setState({...defaultState});
                //if(this.props.publishCallback){
                //    this.props.publishCallback();
                //}
            }
        });
    }

    render(){
        
        return (
            <div className={`publish-form ${this.state.focus ? 'publish-form--expanded' : ''}`}>
                <div>
                    <UserPic userId={this.props.userId} />
                    <textarea placeholder="What are you thinking about?" name="content" onFocus={this._onFocus} onBlur={this._onBlur} onChange={this._onChange} value={this.state.content}></textarea>
                </div>
                <button onClick={this._onPublishClick} className={`button ${this.state.focus && this.state.content ? '' : 'visually-hidden'}`}>Publish</button>
            </div>
        )
    }
}

const MapStateToProps=(state)=>{
    return {userId:getUserId(state), userData:getUserData(state)};
};

export default connect(MapStateToProps)(Publish);