import React, { Component } from 'react'
import { formatDate, getPostLink } from '../scripts/utils';
import UserPic from './UserPic';
import FollowButton from './FollowButton';
import UserName from './UserName';
import { Link } from 'react-router-dom';

export default class PostHeader extends Component {
    render() {
        const data=this.props.data;
        const date=data.date ? formatDate(data.date) : '';
        const postLink=getPostLink(data.topicId);
        //console.log("PostHeader", data);

        return (
            <div className="post__author">
                <UserPic userId={data.authorId} />
                <div>
                    <UserName userId={data.authorId} userName={data.authorName} />
                    <FollowButton followeeId={data.authorId}/>
                    <p className="post__date"><Link to={postLink}>{date}</Link></p>
                </div>
            </div>
        )
    }
}
