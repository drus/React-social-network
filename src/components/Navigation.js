import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';
import { WALL_PATH, PROFILE_PATH, EDIT_PROFILE_PATH, ROOT_PATH } from '../Paths';

class Navigation extends Component {
    render() {

        const links=[{path:ROOT_PATH, label:"HOME"}]
        if(this.props.userId){
            links.push({path:PROFILE_PATH.replace(':id',this.props.userId), label:'Profile'});
            links.push({path:EDIT_PROFILE_PATH, label:'Profile editor'});
            links.push({path:WALL_PATH, label:'Wall'});
        }

        return (
            <footer>
                <ul className="navigation">
                     {links.map(link=><li key={link.path}><Link to={link.path}>{link.label}</Link></li>)}
                </ul>
          </footer>
        )
    }
}

const MapStateToProps=(state)=>{
    return {userId:getUserId(state)};
  };
  
  
  export default connect(MapStateToProps)(Navigation);
  