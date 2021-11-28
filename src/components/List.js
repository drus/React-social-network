import React, { Component } from 'react'
import Post from './Post'
//import server from '../scripts/server';
//import { getUserWall } from '../store/user/reducers';
//import { connect } from 'react-redux';

class List extends Component {

    /* state={
        datalist:[]
    } */

    /* constructor(props){
        super(props);
        //console.log("list props", props);
        //this._deleteItem=this._deleteItem.bind(this); 
    } */

    /* _deleteItem(id){
        console.log("delete id:", id);
         server.database.deleteTopic(id)
        .then(result=>{
            this.setState(prevState => {
                const newDataList=this.props.datalist.filter(item=>item.id!==id);
                return {datalist: newDataList}
             });
        }); 
    }
    */

    render() {
        const data=this.props.datalist || [];//this.state.datalist.length ? this.state.datalist : this.props.datalist;
        return (
            <div className="wall">
                <ul>
                {data.map((item, i)=>
                    <li key={item.id}>
                    <Post topicId={item.id} data={item} deleteCallback={this.props.deleteCallback} />
                    </li>
                )}
                </ul>


            </div>
        )   
   }
}

/* const MapStateToProps=(state)=>{
   return { datalist:getUserWall(state)}
}; */

//export default connect(MapStateToProps)(List);
export default List;