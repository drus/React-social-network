import React, { Component } from 'react';
import server from '../scripts/server';
import Comments from './Comments';
import { getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';
import PostHeader from './PostHeader';
import LikeButton from './LikeButton';
import PostContent from './PostContent';



class Post extends Component {


    constructor(props){
        super(props);

        //this._onLike=this._onLike.bind(this);
        //this._follow=this._follow.bind(this);
        //this._sendComment=this._sendComment.bind(this);
        //this._deleteComment=this._deleteComment.bind(this);
        this._deleteItem=this._deleteItem.bind(this);

        this.state={
            ...props.data,
            topicId:this.props.topicId,
        };
        
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data===this.props.data) return false;
        this.setState({...this.props.data, topicId:this.props.topicId});
    }

    _deleteItem(){
        //console.log("delete id:", id);
        if(!window.confirm('Topic will be deleted permanently, are you sure?')) return false;

        server.database.deleteTopic(this.state.topicId)
        .then(result=>{
            if(this.props.deleteCallback){
                this.props.deleteCallback();
            }
            /* this.setState(prevState => {
                const newDataList=this.props.datalist.filter(item=>item.id!==id);
                return {datalist: newDataList}
             }); */
        });
    }

    


    /* _deleteComment(comment){
        server.database.deleteComment(this.props.topicId, comment)
        .then(r=>{
            //console.log("_deleteComment response=", r);
            this.setState({...r});
        })
    } */

    /* _onLike(e){
        server.database.like(this.props.topicId)
        .then(()=>{
            this.setState(prevState => {
                const prevLikes=prevState.likes || 0;
                return {likes: prevLikes + 1}
             });
        });
    }
 */
    /* _follow(e){
        server.database.followUser(this.state.authorId)
        //todo marcar como seguido
        .then(result=>{
            console.log("result", result);
        });
    } */

    _renderDeletePostButton(authorId){
        if(this.props.userId===authorId){
            //return <button className="close-button" onClick={this._deleteItem}> Delete</button>
            return <button className="delete-button delete-post-button" onClick={this._deleteItem}> Delete post </button>
        }
    }


    
    render() {
        const data=this.state;
        //console.log("Post", data);
        //const postLink=`/topic/${data.topicId}`;
        return (
            <article className="post" key={data.topicId} >
                
                <PostHeader data={data} />
                <PostContent content={data.content} />
                <LikeButton topicId={data.topicId} likes={data.likes} />
                {this._renderDeletePostButton(data.authorId)}
                <Comments topicId={data.topicId} comments={data.comments || []} />
                
                {/* 
                <div className="post__author">
                    <UserPic userId={data.authorId} />
                    <div>
                        <UserName userId={data.authorId} userName={data.authorName} />
                        <FollowButton onClick={this._follow}/>
                        <p className="post__date"><Link to={postLink}>{date}</Link></p>
                    </div>
                </div>
                 */}
                 {/* <button className="like-button" onClick={this._onLike} title="Like">
                    <span className="like-button__count">{data.likes} <span className="visually-hidden">Likes</span></span>
                </button> */}
                {/* <CommentForm commentMethod={this._sendComment} authorId={data.authorId} /> */}
                
                
                
            </article>
        )
    }
}



const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(Post);
  