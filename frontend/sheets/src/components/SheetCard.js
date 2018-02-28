import React, { Component } from 'react';
import { connect } from 'react-redux'
import { suggestNewSheetName, changeSheetName, setNewSheetName } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        sheetBeingEdited: state.sheets.sheetBeingEdited,
        newSheetName: state.sheets.newSheetName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        suggestNewSheetName: (sheetName) => {
            dispatch(suggestNewSheetName(sheetName));
        },
        changeSheetName: (sheetName) => {
            dispatch(changeSheetName(sheetName));
        },
        setNewSheetName: (sheetName) => {
            dispatch(setNewSheetName(sheetName));
        },
    }
}

const _SheetCard = class extends Component {
    constructor(props) {
        super(...props);
        this.handelEdit = this.handelEdit.bind(this);
        this.handelSave = this.handelSave.bind(this);
        this.handleChangeNewSheetName = this.handleChangeNewSheetName.bind(this);

    }
    handelEdit(event) {
        this.props.suggestNewSheetName(this.props.sheet);
    }
    handelSave(event) {
        this.props.changeSheetName(this.props.sheet);
    }
    handleChangeNewSheetName(event) {
        this.props.setNewSheetName(event.target.value);
    }


    render() {
        const labelOrEditInput = (this.props.sheet !== this.props.sheetBeingEdited) ?
            <div className="field is-grouped">
                <p className="control title is-4 is-expanded" style={{color:'black'}}>
                    {this.props.sheet}
                </p>
                <p className="control is-pulled-right">
                    <a className="button is-info" onClick={this.handelEdit}>
                        Edit Name
                    </a>
                </p>
            </div>
            :
            <div className="field is-grouped">
                <p className="control is-expanded">
                    <input className="input" type="text" value={this.props.newSheetName} onChange={this.handleChangeNewSheetName}/>
                </p>
                <p className="control">
                    <a className="button is-info" onClick={this.handelSave}>
                        Save
                    </a>
                </p>
            </div>;
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content ">
                            {labelOrEditInput}
                        </div>
                    </div>
                    <div className="content">
                        <p className="title is-6">Created: 11:09 PM - 1 Jan 2016</p>
                    </div>
                </div>
            </div>
        );
    }
}

const SheetCard = connect(mapStateToProps, mapDispatchToProps)(_SheetCard)


export default SheetCard;
