import React, { Component } from 'react';
import { connect } from 'react-redux'
import NameForm from '../widgets/NameForm.js';
import { toggleEmail, togglePassword, attemptEmail, attemptPassword, submitEmail, submitPassword } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        string: state.session.id,
        accountError: state.account.error,
        username: state.account.username,
        password: state.account.password,
        email: state.account.email
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        attemptLogin: (username, password) => {
            dispatch(attemptLogin(username, password));
        },
        toggleRegister: (val) => {
            dispatch(toggleRegister(val));
        },
        submitLoginInfo: (key, value) => {
            dispatch(submitLoginInfo(key, value));
        }
    }
}

const _LoginControl = class extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleToggleRegister = this.handleToggleRegister.bind(this);
    }

    handleLoginClick(event) {
        this.props.attemptLogin(this.props.username, this.props.password);
    }

    handleToggleRegister(event) {
        this.props.toggleRegister();
    }

    render() {
        const failedText = (this.props.loginError) ?
            <div className='has-text-danger is-size-4 has-text-weight-bold'>
                {this.props.loginError}
            </div>
            : null;
        return (
            <div>
                <h1 className='title'>Please sign in.</h1>
                <NameForm setMethod={this.props.submitLoginInfo} label1='Username' label2='Password'
                    value1={this.props.username} value2={this.props.password}/>
                <br/>
                <div className='field is-grouped is-grouped-centered'>
                    <p className='control'>
                        <button onClick={this.handleLoginClick} className='button is-primary is-inverted'>Login</button>
                    </p>
                    <p className='control'>
                        <button onClick={this.handleToggleRegister} className='button is-primary is-inverted'>Register</button>
                    </p>
                </div>
                {failedText}
            </div>
        );
    }
}

const LoginControl = connect(mapStateToProps, mapDispatchToProps)(_LoginControl)


export default LoginControl;
