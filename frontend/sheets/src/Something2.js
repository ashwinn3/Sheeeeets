import React, { Component } from 'react';

const Something2 = class extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onClick(event.target.value)
    }
    render() {
      return (
        <div>
            {this.props.string}
            <a href="" onClick={e => {
                e.preventDefault()
            }}> Click me </a>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
      )
    }
}


export default Something2;

