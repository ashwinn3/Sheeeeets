import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        firstName: state.session.firstName,
        lastName: state.session.lastName,
        email: state.session.email,
        username: state.session.username,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const _AccountManage = class extends Component {


    constructor(...args) {
        super(...args);
    }

    render() {
        return <div className="section">
                    <div>
                        <h1>Name: {this.props.firstName} {this.props.lastName}</h1>
                    </div>
                    <div>
                        <h1>Username: {this.props.username}</h1>
                    </div>
                    <div>
                        <h1>Email: {this.props.email}
                            <form action="/changeEmail">
                                <button type="submit">Change Email</button>
                            </form>
                        </h1>
                    </div>
                    <div>
                        <form action="/changePassword">
                            <button type="submit">Change Password</button>
                        </form>
                    </div>
                </div>;
    }

}
const AccountManage = connect(mapStateToProps, mapDispatchToProps)(_AccountManage)

export default AccountManage;