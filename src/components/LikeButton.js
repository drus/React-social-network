import React, { Component } from 'react'
import server from '../scripts/server';

export default class LikeButton extends Component {

    constructor(props) {
        super(props)
        this._onLike=this._onLike.bind(this);
        this.state={
            likes:props.likes
        }
    }
    

    _onLike(e){
        server.database.like(this.props.topicId)
        .then(()=>{
            this.setState(prevState => {
                const prevLikes=prevState.likes || 0;
                return {likes: prevLikes + 1}
             });
        });
    }


    render() {
        return (
            <button className="like-button" onClick={this._onLike} title="Like">
                <span className="like-button__count">{this.state.likes} <span className="visually-hidden">Likes</span></span>
            </button>
        )
    }
}
