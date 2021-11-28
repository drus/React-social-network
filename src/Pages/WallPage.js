/* 
En wall se muestran las publicaciones de los usuarios a los que sigue el usuario
Si el suario no esta logado, debería redirigir a la home
*/
import React, { Component } from 'react'
import WallDataprovider from '../components/WallDataprovider'
import List from '../components/List'
import { getUserId } from '../store/user/reducers'
import { connect } from 'react-redux'
import Publish from '../components/Publish'
//import server from '../scripts/server'

class WallPage extends Component {


    
    _publishRender(){
        if(this.props.userId){
            return <Publish/>
        }
    }
    
    render() {
        //console.log("userId", this.props.userId);
        
        
        return (
            <div>
                <div className="wall-wrapper">
                    <h1 className="page-title">Wall</h1>
                    {this._publishRender()}


                    <WallDataprovider>
                        <List></List>
                    </WallDataprovider>

                    
                </div>
            </div>
        )
    }
}


const MapStateToProps=(state)=>{
    return {
        //datalist:getUserWall(state),
        userId:getUserId(state)
    }
};

export default connect(MapStateToProps)(WallPage);

