import React, { Component } from 'react';
import store from '../store';
import { setUserId, setUserData } from '../store/user/actions';
import server from '../scripts/server';
import { getUserData, getUserId } from '../store/user/reducers';
import { connect } from 'react-redux';

class Login extends Component {

    state={
        email:'drusunlimited+user2@gmail.com',
        password:'socialuser2',
        users:[{
            name:'Javi',
            email:'drusunlimited+user2@gmail.com',
            password:'socialuser2'
        },{
            name:'Ivan',
            email:'drusunlimited+user1@gmail.com',
            password:'socialuser1'
        },{
            name:'Tes',
            email:'drusunlimited+usertest@gmail.com',
            password:'socialusertest'
        },{
            name:'La Veneno',
            email:'drusunlimited+veneno@gmail.com',
            password:'socialuserveneno'
        }]
    }

    constructor(props){
        super(props);
        if(this.props.userId){
            this._updateUserData();
        }

        this._handleClick=this._handleClick.bind(this);
        this._onChange=this._onChange.bind(this);
        this._onUserChange=this._onUserChange.bind(this);

    }

    _onChange(e){
        this.setState({[e.target.type]:e.target.value});
    }

    _handleClick(e){
        //console.log("getUserId(state)", getUserId(this.state));
        if(server.auth.checkLogged()){
            server.auth.logout();
            store.dispatch(setUserId(null));
            return false;
        }

        server.auth.login(this.state.email, this.state.password)
            .then(uid=>{
                console.log("uid", uid);
                store.dispatch(setUserId(uid));
                //return server.database.getUser(uid);
            })
            /* .then(userData=>{
                console.log("authorData", userData);
                store.dispatch(setUserData(userData));
            }) */

            .catch(error=>{
                console.log("error", error);
                alert(error.message);
            }
        );
        /* 
                server.auth.login(this.state.email, this.state.password)
            .then(uid=>{
                //console.log("uid", uid);
                store.dispatch(setUserId(uid));
            })
            .then(server.database.getUser(props.data.authorId))
            .then(authorData=>{
                this.setState({authorData})
            }))
            .catch(error=>{
                console.log("error", error);
            }
        );
        */
    }

    componentDidUpdate(prevProps){
        if(this.props.userId && this.props.userId!==prevProps.userId){
            this._updateUserData();
        }
    }
    
    async _updateUserData(){
        console.log("_updateUserData", this.props.userId);
        
        const userData=await server.database.getUser(this.props.userId);
        
        //console.log("userData", userData);
        //this.setState({...userData});
        store.dispatch(setUserData(userData));
    }

    _onUserChange(e){
        const fooUser=this.state.users[e.target.value];
        console.log("fooUser", fooUser);
        this.setState({
            email:fooUser.email,
            password:fooUser.password
        });
        this.render()
    }

    _renderComboUsers(){
        return (
            <div>
                <p>users</p>
                <select onChange={this._onUserChange}>
                    {this._renderOptions()}
                </select>
            </div>
        )
    }
    _renderOptions(){
        return (
            this.state.users.map((user, i)=>{
                return <option key={i} value={i}>{user.name}</option>
            })
                
        )
    }

    render(){
            return (
                <div className="form login-form">
                    {this._renderComboUsers()}

                    <input type="email" onChange={this._onChange} value={this.state.email} />
                    <input type="password" onChange={this._onChange} value={this.state.password} />
                    <button onClick={this._handleClick} className="button ">enviar</button>
                </div>
            )
    }
}

const MapStateToProps=(state)=>{
    return {userId:getUserId(state), userData:getUserData(state)};
};

export default connect(MapStateToProps)(Login);
//export default Login;