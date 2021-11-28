import server from '../scripts/server';
import React, { Component } from 'react';
import store from '../store';
import { setUserWall } from '../store/user/actions';
import { getUserWall, getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';

class WallDataprovider extends Component {

    constructor(props){
        super(props);
        this.state={
            datalist:[]
        };
        /* server.database.getPath('users/CWAgGCJobeawOnmp9ybB7qhtVYB3')
            .then(result=>{
                //console.log("result", result);
            }) */
    }

    getUserWall(userId){
        console.log("getUserWall", userId);
        server.database.getUserWall(userId)
        .then(result=>{
            /* this.setState({
                datalist:result
            }); */
            store.dispatch(setUserWall(result));
        })
    }

    getGenericWall(){
        console.log("getGenericWall");
        server.database.getCollection('topics')
        .then(result=>{
            console.log("result", result);
            /* this.setState({
                datalist:result
            }); */
            store.dispatch(setUserWall(result));
        })
    }



    componentDidMount(){
        //console.log("this.props.userId", this.props.userId);
        //const users= await getCollection('users');
        //const followees=users.get(uid).get('followees');

        //const topicsData=[];
        if(this.props.profileId){
            this.getUserWall(this.props.profileId);
        }else if(this.props.userId){
            this.getUserWall(this.props.userId);
        }else{
            this.getGenericWall();
        }
        //const topicsData=await server.database.getCollection('topics');
        //console.log("topicsData", topicsData);
        //store.dispatch(setUserWall(topicsData));

        /* this.setState({
            datalist:topicsData
        }); */
      }

      
    render() {
        console.log("render wall dataprovider", this.props.userId);
        /* if(this.props.userId){
            this.getUserWall(this.props.userId);
        }else{
            this.getGenericWall();
        } */
        //console.log("this.state.datalist", this.state.datalist);

        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                datalist: this.props.datalist,
                store:store
            });
        });
    }
}
    

const MapStateToProps=(state)=>{
    return {
        datalist:getUserWall(state),
        userId:getUserId(state)
    }
};

export default connect(MapStateToProps)(WallDataprovider);
//export default WallDataprovider;