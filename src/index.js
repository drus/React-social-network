import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Server from './scripts/server';
import store from './store';
import { setUserId } from './store/user/actions';
import { Provider } from 'react-redux';

Server.init()
.then((userId)=>{
    store.dispatch(setUserId(userId))
    startReactApp();
});

function startReactApp(userId){

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    ,document.getElementById('root'));

}