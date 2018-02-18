import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSheets } from '../states/actions'
import SheetCard from './SheetCard'


const mapStateToProps = (state, ownProps) => {
    return {
        sheets: state.sheets.sheets,
        username: state.session.username
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getSheets: (username) => {
            dispatch(getSheets(username));
        }
    }
}

const _SheetList = class extends Component {
    constructor(props) {
        super(...props);
    }
    componentWillMount() {
        this.props.getSheets(this.props.username);
    }


    render() {
        return (
            <div>
                {this.props.sheets.map((sheet,i) => {
                    return <SheetCard key={i} sheet={sheet}/>
                })}
            </div>
        );
    }
}

const SheetList = connect(mapStateToProps, mapDispatchToProps)(_SheetList)


export default SheetList;