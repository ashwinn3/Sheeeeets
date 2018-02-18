import React, { Component } from 'react';
import { connect } from 'react-redux'
import { togglePassword, attemptPassword, submitPassword } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        passwordIsToggled: state.account.passwordIsToggled,
        passwordError: state.password.error,
        passwordSuccessful: state.password.wasSuccessful,
        username: state.password.username,
        password: state.password.password,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        togglePassword: (val) => {
            dispatch(togglePassword(val));
        },
        attemptPassword: ({username, password}) => {
            dispatch(attemptPassword({username, password}));
        },
        submitPassword: (key, value) => {
            dispatch(submitPassword(key, value));
        },

    }
}


const _PasswordModal = class extends Component {
    constructor(...args) {
        super(...args);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    handleInputChange(event) {
        this.props.submitPassword([event.target.name], event.target.value);
    }
    submitUser() {
        this.props.attemptPassword({
            username: this.props.username,
            password: this.props.password
        });
    }


    render() {
        const activeClass = (this.props.isActive) ? 'modal is-active' : 'modal';
        const errorMessage = (this.props.passwordError && !this.props.passwordSuccessful) ?
            <div className='has-text-danger is-size-7 has-text-weight-bold'>
                {this.props.passwordError}
            </div>
            : null;
        return <div className={activeClass}>
            <div className='modal-background' onClick={this.props.togglePassword}>
            </div>

            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>Change Password</p>
                </header>

                <section className='modal-card-body'>
                    <form>
                        <div className='field'>
                            <label className='label'>Password</label>
                            <div className='control'>
                                <input className='input'
                                    name='password'
                                    type='password'
                                    value={this.props.password}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </form>
                </section>

                <footer className='modal-card-foot'>
                    <button onClick={this.submitUser} className='button is-primary'>Submit</button>
                    <button onClick={this.props.togglePassword} className='button'>Cancel</button>
                    {errorMessage}
                </footer>
            </div>
            <button onClick={this.props.togglePassword} className='modal-close is-large' aria-label='close'></button>
        </div>;
    }
}
const PasswordModal = connect(mapStateToProps, mapDispatchToProps)(_PasswordModal)

export default PasswordModal;

