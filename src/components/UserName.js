import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';

export default class UserName extends PureComponent {
    render() {
        const profileLink=`/profile/${this.props.userId}`;
        const userName=this.props.userName || '';

        return (
            <Link className="username" to={profileLink}>{userName}</Link>
        )
    }
}
