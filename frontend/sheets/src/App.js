import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bulma/css/bulma.css';
import { connect } from 'react-redux'

import Toolbar from './components/Toolbar.js';
import LoginPage from './pages/LoginPage.js';
import Dashboard from './pages/Dashboard.js';
import NotFound from './pages/NotFound.js';

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isLoggedIn,
    }
}

const RedirectHome = class extends Component {
    render() {
        return <Redirect to='/'  />;
    }
}
const RedirectLogin = class extends Component {
    render() {
        return  <Redirect to='/login'/>
    }
}

class _App extends Component {
    constructor(...args) {
        super(...args);
        this.handelLogin = this.handelLogin.bind(this);
        this.state = {
            id: "",
            name: "",
            requestFailed : false,
            loggedIn : false
        };
    }

    componentDidMount() {
    }

    handelLogin(info) {
        this.setState(
            {   loggedIn : info.login,
                id       : info.id,
                name     : info.name}
        )
    }
    handelLogout = () => {
        this.setState(
            {loggedIn : false,
             id       : null}
        )
    }

    render() {
        let elements;
        if (this.props.isLoggedIn) {
            elements = (
                <div>
                    <Toolbar/>
                    <Switch>
                        <Route exact path="/" render={(props) => (
                            <Dashboard/>)} />
                        <Route path="/login" component={RedirectHome}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            );
        } else {
            elements =
                <div className="hero is-primary is-fullheight">
                    <Switch>
                        <Route exact path="/login" render={(props) => (
                            <LoginPage {...props}/>)} />
                        <Route component={RedirectLogin}/>
                    </Switch>;
                </div>
        }
        return (
            <BrowserRouter>
                <div className="App">
                    {elements}
                </div>
            </BrowserRouter>
        );

    }
}
const App = connect(mapStateToProps)(_App)

export default App;


