import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import CustomWallPage from './Pages/CustomWallPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import PostPage from './Pages/PostPage';
import LoginPage from './Pages/LoginPage';
import SignInPage from './Pages/SignInPage';

import * as PATHS from './Paths'
import EditProfilePage from './Pages/EditProfilePage';

/* <Route exact path=WALL_PATH component={WallPage} /> */

export default class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={PATHS.LOGIN_PATH} component={LoginPage} />
                <Route exact path={PATHS.SIGNIN_PATH} component={SignInPage} />
                <Route exact path={PATHS.WALL_PATH} component={CustomWallPage} />
                <Route exact path={PATHS.ROOT_PATH} component={HomePage} />
                <Route path={PATHS.PROFILE_PATH} component={ProfilePage} />
                <Route path={PATHS.EDIT_PROFILE_PATH} component={EditProfilePage} />
                <Route path={PATHS.TOPIC_PATH} component={PostPage} />
                <Route path="*" component={() => <div>404</div> } />
            </Switch>
        )
    }
}
