import React, { Component } from 'react'
import { formatDate } from '../scripts/utils';
import UserPic from './UserPic';
import { getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';
import server from '../scripts/server';
import UserName from './UserName';

class Comment extends Component {

    state={
        authorData:{
            authorId:undefined,
            name:'unnamed'
        }
    }

    constructor(props) {
        super(props);
        this._deleteComment=this._deleteComment.bind(this);
    }

    _deleteComment(){
        //this.props.deleteCommentMethod(this.props.data)
        server.database.deleteComment(this.props.topicId, this.props.data)
        .then(r=>{
            console.log("_deleteComment response=", r);
            this.setState({...r});
        })
    }

    _renderDeleteButton(authorId){
        if(this.props.userId===this.props.data.authorId){
        return (
            <button className="delete-button" onClick={this._deleteComment}> Borrar comentario </button>
            )
        }
    }

    
    

    render() {
        const data=this.props.data;
        const date=((data.date && formatDate(data.date)) || 'Undated');
        

        return (
        <li className="comment">
            <UserPic userId={data.authorId} />
            <div>
                <p className="comment__content">
                    <UserName userId={data.authorId} userName={data.authorName} />
                    {data.content}
                </p>
                <p className="comment__date">
                    {date}{this._renderDeleteButton(data.authorId)}
                </p>
            </div>

            
            
        </li>);
    }
}


const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(Comment);