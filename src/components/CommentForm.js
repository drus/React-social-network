import React, { Component } from 'react'
import { getUserId, getUserData } from '../store/user/reducers';
import { connect } from 'react-redux';
import UserPic from './UserPic';
import server from '../scripts/server';

const initialState={
    content:''
};

class CommentForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {...initialState}

        this._onChange=this._onChange.bind(this);
        this._onEnter=this._onEnter.bind(this);
        this._sendComment=this._sendComment.bind(this);

    }

    _sendComment(comment){
        server.database.setComment(this.props.topicId, comment)
        .then(r=>{
            console.log("_sendComment response=", r);
            //this.setState({...r});
        })
    }
    

    _onChange(e){
        this.setState({content:e.target.value});
        
    }

    _onEnter(e){
        //console.log("this.props.userData.name", this.props.userData.name);
        if(e.keyCode===13){
            e.preventDefault();
            this._sendComment({
                content:this.state.content,
                authorId:this.props.userId,
                authorName:this.props.userData.name,
                date:new Date()
            });
            
            this.setState(initialState);
            e.target.blur();
        }
        
    }

    



    render() {
        return (
            <div className="comment-form">
                <UserPic userId={this.props.userId} />
                <textarea onKeyDown={this._onEnter} onChange={this._onChange} value={this.state.content}></textarea>
                {/* <button onClick={this._onSend} className="button">Send</button> */}
            </div>
        )
    }
}


const MapStateToProps=(state)=>{
    return {userId:getUserId(state), userData:getUserData(state)};
};

export default connect(MapStateToProps)(CommentForm);