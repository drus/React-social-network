import server from '../scripts/server';
import React, { Component } from 'react';

class ProfileDataprovider extends Component {

    constructor(props){
        super(props);
        this.state={
            datalist:[]
        };

    getUserWall(userId){
        //console.log("getUserWall", userId);
        server.database.getUserWall(userId)
        .then(result=>{
            this.setState({
                datalist:result
            });
        });
    }



    componentDidMount(){
     this.getUserWall(this.props.profileId);
    }

      
    render(){

        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                datalist: this.props.datalist,
                store:store
            });
        });
    }
}

export default ProfileDataprovider;