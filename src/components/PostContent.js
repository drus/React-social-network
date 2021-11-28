import React, { Component } from 'react'
import { processLinks } from '../scripts/utils'

export default class PostContent extends Component {
    render() {
        return (
               <div className="post__content">{processLinks(this.props.content)}</div>
        )
    }
}
