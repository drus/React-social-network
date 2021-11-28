import React, { Component } from 'react'
import Comment from './Comment';
import CommentForm from './CommentForm';
import { connect } from 'react-redux';
import { getUserId } from '../store/user/reducers';

class Comments extends Component {
    state={
        showComments:false
    }

    constructor(props) {
        super(props);

        this._onToggleComments=this._onToggleComments.bind(this);
        //this._sendComment=this._sendComment.bind(this);
    }

    /* _sendComment(comment){
        server.database.setComment(this.props.topicId, comment)
        .then(r=>{
            console.log("_sendComment response=", r);
            this.setState({...r});
        })
    } */

    _renderCommentForm(){
        if(this.props.userId){
            return <CommentForm topicId={this.props.topicId} />
        }
    }


    _onToggleComments(e){
        //this.setState({showComments:e.target.checked});
        this.setState({showComments:!this.state.showComments});
    }

    render(){
        const comments=this.props.comments || [];
        const comments__containerClasses=this.state.showComments ? 'comments__container comments__container--expanded' : 'comments__container';

        /* if(!comments || !comments.length){
            return <p>No comments</p>
        } */

        return (
            <div className="comments">
                <p>
                    <button className="comments-button" onClick={this._onToggleComments} title="Comments">
                        <span className="comments-button__count">{comments.length || ''} <span className="visually-hidden">comments</span></span>
                    </button>

                    {/* <label className="comments-button" htmlFor={"showComments"+this.props.topicId}>
                        <input type="checkbox" id={"showComments"+this.props.topicId} onChange={this._onToggleComments} />
                        <span className="comments-button__count"></span>{comments.length} <span className="visually-hidden">comments</span>
                    </label> */}
                </p>
                <div className={comments__containerClasses}>
                    <ul>
                    {comments.map((comment, id)=><Comment 
                        key={id} 
                        topicId={this.props.topicId}
                        data={comment} 
                        />)}
                    </ul>
                    {this._renderCommentForm()}
                </div>
            </div>

        );
    }
}



const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(Comments);
  