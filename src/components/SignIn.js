import React, { Component } from 'react';
import store from '../store';
import { setUserId, setUserData } from '../store/user/actions';
import server from '../scripts/server';

export default class SignIn extends Component {


    constructor(props){
        super(props);

        this._handleClick=this._handleClick.bind(this);
        this._onChange=this._onChange.bind(this);

        this.state={
            logged:false,
            email:'',
            password:'',
            password2:''
        }
        
    }

    _onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    _handleClick(e){

        if(!(this.state.password && this.state.password===this.state.password2)){
            return false;
        }

        server.auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(uid=>{
                //console.log("uid", uid);
                
                store.dispatch(setUserId(uid));
                const name=this.state.email.replace(/@.+/, Date.now());
                return server.database.registerUser(uid, name);
            })
            .then(userData=>{
                this.setState({logged:true});
                store.dispatch(setUserData(userData));
            })
            .catch(error=>{
                console.log("error", error);
            }
        );
    }


    render(){
        /* const userId=server.auth.checkLogged();
        if(userId){
            return <Redirect to={EDIT_PROFILE_PATH} />
        }else{ */
            return (
                <div className="form login-form">
                    <input type="email" name="email" placeholder="email" onChange={this._onChange} value={this.state.email} />
                    <input type="password" name="password" placeholder="password" onChange={this._onChange} value={this.state.password} />
                    <input type="password" name="password2" placeholder="repeat password" onChange={this._onChange} value={this.state.password2} />
                    <button onClick={this._handleClick} className="button ">enviar</button>
                </div>
            )
        //}
    }
}
