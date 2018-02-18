import React, { Component } from 'react';
import { connect } from 'react-redux'
import { } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps
  }
}

const _SheetCard = class extends Component {
    constructor(props) {
        super(...props);
    }


    render() {
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{this.props.sheet}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p className="title is-6">Created</p>
                        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
            </div>
        );
    }
}

const SheetCard = connect(mapStateToProps, mapDispatchToProps)(_SheetCard)


export default SheetCard;
