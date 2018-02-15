import React, { Component } from 'react';

const Something_view = class extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onClick(event.target.value);
    }
    handleChange2(event) {
        this.props.onClick2(this.state.value);
    }
    render() {
      return (
        <div>
            <div>
                {this.props.string}
                <button type="button" onClick={this.handleChange2}>Click me!</button>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
            <div>
                {this.props.ownProps}
            </div>
        </div>
      )
    }
}


export default Something_view;

