import React, { Component } from 'react'
//import server from '../scripts/server';
import { Link } from 'react-router-dom';
import UserPic from './UserPic';

export default class Followees extends Component {


    state={
        followees:[]
    };

    constructor(props){
        super(props);
        this._onUnfollowClick=this._onUnfollowClick.bind(this);
    }

    _onUnfollowClick(e){
        const id=e.target.dataset.id;
        this.props.unfollowMethod(id);
    }

    _listFollowees(){
        return this.props.followees.map(item=>{
            const profileLink=`/profile/${item}`;
            return (
                <li key={item}>
                    <UserPic userId={item} />
                    <span className="followees-name">
                        <Link to={profileLink}>{item}</Link>
                    </span>
                    <button data-id={item} onClick={this._onUnfollowClick}>
                        <span className="button-label">unfollow</span>
                    </button>
                </li>
            );
        });
    }

    _renderTitle(){
        return (
            <header>{this.props.followees && this.props.followees.length ? 'Following' : 'Not followees'}</header>
        )
    }

    render() {
        if(!this.props.userId){
            return null;
        }
        return (
            <div className="followees">
                {this._renderTitle()}
                <ul>
                    {this._listFollowees()}
                </ul>
            </div>
        )
    }
}
