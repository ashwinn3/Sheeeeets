import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleEmail, attemptEmail, submitEmail } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        emailIsToggled: state.account.emailIsToggled,
        emailError: state.email.error,
        emailSuccessful: state.email.wasSuccessful,
        username: state.email.username,
        email: state.email.email,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleEmail: (val) => {
            dispatch(toggleEmail(val));
        },
        attemptEmail: ({username, email}) => {
            dispatch(attemptEmail({username, email}));
        },
        submitEmail: (key, value) => {
            dispatch(submitEmail(key, value));
        },

    }
}


const _EmailModal = class extends Component {
    constructor(...args) {
        super(...args);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    handleInputChange(event) {
        this.props.submitEmail([event.target.name], event.target.value);
    }
    submitUser() {
        this.props.attemptEmail({
            username: this.props.username,
            email: this.props.email
        });
    }


    render() {
        const activeClass = (this.props.isActive) ? 'modal is-active' : 'modal';
        const errorMessage = (this.props.emailError && !this.props.emailSuccessful) ?
            <div className='has-text-danger is-size-7 has-text-weight-bold'>
                {this.props.emailError}
            </div>
            : null;
        return <div className={activeClass}>
            <div className='modal-background' onClick={this.props.toggleEmail}>
            </div>

            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>Change Email</p>
                </header>

                <section className='modal-card-body'>
                    <form>
                        <div className='field'>
                            <label className='label'>Email</label>
                            <div className='control'>
                                <input className='input'
                                    name='email'
                                    type='textbox'
                                    value={this.props.email}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </form>
                </section>

                <footer className='modal-card-foot'>
                    <button onClick={this.submitUser} className='button is-primary'>Submit</button>
                    <button onClick={this.props.toggleEmail} className='button'>Cancel</button>
                    {errorMessage}
                </footer>
            </div>
            <button onClick={this.props.toggleEmail} className='modal-close is-large' aria-label='close'></button>
        </div>;
    }
}
const EmailModal = connect(mapStateToProps, mapDispatchToProps)(_EmailModal)

export default EmailModal;

