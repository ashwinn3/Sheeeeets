import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewSheetInput from '../components/NewSheetInput'
import SheetList from '../components/SheetList'
import {  } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        registerIsToggled: state.login.registerIsToggled,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const _Dashboard = class extends Component {


    constructor(...args) {
        super(...args);
    }

    render() {
        return <div className="section">
                    <h1>Dashboard goes here</h1>
                    <NewSheetInput/>
                    <SheetList/>
                </div>;
    }

}
const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)

export default Dashboard;
