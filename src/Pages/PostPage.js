import React, { Component } from 'react'
import Post from '../components/Post'
import server from '../scripts/server'

export default class PostPage extends Component {

    state={
        topic:{}
    }

    constructor(props) {
        super(props)
    
        this.state = {
             id:this.props.match.params.id
        }
    }
    

    componentDidMount(){
        server.database.getTopic(this.state.id)
        .then(topic=>{
            this.setState({topic});
        });

    }

    render() {
        return (
            <div className="wall-wrapper">
                <h1 className="visually-hidden">Topic</h1>
                <Post topicId={this.state.id} data={this.state.topic} />
            </div>
        )
    }
}
