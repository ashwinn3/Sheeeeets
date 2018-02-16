import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        firstName: state.session.firstName,
        lastName: state.session.lastName,
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
                    <h1>Name: {this.props.firstName} {this.props.lastName}</h1>
                </div>;
    }

}
const AccountManage = connect(mapStateToProps, mapDispatchToProps)(_AccountManage)

export default AccountManage;