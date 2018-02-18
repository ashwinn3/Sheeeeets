import React, { Component } from 'react';
import { connect } from 'react-redux'
import NameForm from '../widgets/NameForm.js';
import { toggleEmail, togglePassword, attemptEmail, attemptPassword, submitEmail, submitPassword } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        accountError: state.account.error,
        username: state.account.username,
        password: state.account.password,
        email: state.account.email,
        firstName: state.account.firstName,
        lastName: state.account.lastName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        attemptPassword: (username, password) => {
            dispatch(attemptPassword(username, password));
        },
        attemptEmail: (username, email) => {
            dispatch(attemptEmail(username, email));
        },
        togglePassword: (val) => {
            dispatch(togglePassword(val));
        },
        toggleEmail: (val) => {
            dispatch(toggleEmail(val));
        },
        submitPassword: (key, value) => {
            dispatch(submitPassword(key, value));
        },
        submitEmail: (key, value) => {
            dispatch(submitEmail(key, value));
        }
    }
}

const _AccountControl = class extends Component {
    constructor(props) {
        super(props);
        this.handleTogglePassword = this.handleTogglePassword.bind(this);
        this.handleToggleEmail = this.handleToggleEmail(this);
    }

    handleTogglePassword(event) {
        this.props.togglePassword();
    }

    handleToggleEmail(event) {
        this.props.toggleEmail();
    }

    render() {
        const failedText = (this.props.accountError) ?
            <div className='has-text-danger is-size-4 has-text-weight-bold'>
                {this.props.accountError}
            </div>
            : null;
        return (
            <div>
                <h1>Name: {this.props.firstName} {this.props.lastName}</h1>
                <br/>
                <h1>Username: {this.props.username}</h1>
                <br/>
                <h1>Email: {this.props.email}</h1>
                <div className='field is-grouped is-grouped-centered'>
                    <p className='control'>
                        <button onClick={this.handleToggleEmail} className='button is-primary is-inverted'>Change Email</button>
                    </p>
                    <p className='control'>
                        <button onClick={this.handleTogglePassword} className='button is-primary is-inverted'>Change Password</button>
                    </p>
                </div>
                {failedText}
            </div>
        );
    }
}

const AccountControl = connect(mapStateToProps, mapDispatchToProps)(_AccountControl)


export default AccountControl;
