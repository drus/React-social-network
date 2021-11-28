import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserId, getUserData } from '../store/user/reducers';
import { Redirect } from 'react-router';
import { ROOT_PATH } from '../Paths';
import server from '../scripts/server';
import store from '../store';
import { setUserData } from '../store/user/actions';
import UserPic from '../components/UserPic';

class EditProfilePage extends Component {


    constructor(props) {
        super(props)
        this.state={
            name: props.userData ? this.props.userData.name : ''
        }
        this._onChange=this._onChange.bind(this);
        this._onSend=this._onSend.bind(this);
        this._onFileChange=this._onFileChange.bind(this);
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps){
        if(prevProps.userData && this.props.userData && prevProps.userData.name!==this.props.userData.name){
            /* this.setState({
                name:this.props.userData.name
            }) */
        }
        
    }

    _onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    _onSend(){
        const newUserName=this.state.name;
        this.setState({name:''});
        server.database.updateProfile(this.props.userId, {name:newUserName})
        .then((r)=>{
            //console.log("r", r);
            store.dispatch(setUserData({name:newUserName}));
        });
        
    }

    _onFileChange(e){
        const file=e.target.files.length && e.target.files[0];
        //console.log("file", file);
        server.storage.uploadImage(file, this.props.userId, 'profilePictures');
    }
    

    render() {
        if(!this.props.userId){
            return <Redirect to={ROOT_PATH} />
        }

        return (
            <div className="form-wrapper">
                <div className="profile-editor">
                    <p>Choose your nickname:</p>
                    <p>
                        <input type="text" name="name" onChange={this._onChange} value={this.state.name} />
                        <button className="button" onClick={this._onSend} disabled={!this.state.name}>Enviar</button>
                        <UserPic userId={this.props.userId} userData={this.props.userData} />
                       {/*  <img src={this.props.userData && this.props.userData.picture} alt="" /> */}
                        <input name="file" onChange={this._onFileChange} type="file" accept="image/png, image/jpeg"/>
                    </p>
                </div>
            </div>
        )
    }
}

const MapStateToProps=(state)=>{
    return {userId:getUserId(state), userData:getUserData(state)};
}

export default connect(MapStateToProps)(EditProfilePage);