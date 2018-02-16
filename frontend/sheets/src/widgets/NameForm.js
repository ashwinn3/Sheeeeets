import React, { Component } from 'react';

const NameForm = class extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.state ={
            field1: null,
            field2: null
        };
    }

    handleInputChange1(event) {
        this.setState({
            field1: event.target.value
        })
        this.props.setMethod(event.target.value, this.state.field2);
    }
    handleInputChange2(event) {
        this.setState({
            field2: event.target.value
        })
        this.props.setMethod(this.state.field1, event.target.value);
    }


    render() {
        return (
            <form>
                <div className="field">
                    <label className="label">{this.props.label1}</label>
                    <div className="control">
                        <input className="input"
                            name="name"
                            type="textbox"
                            onChange={this.handleInputChange1} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">{this.props.label2}</label>
                    <div className="control">
                        <input className="input"
                        name="pass"
                        type="textbox"
                        onChange={this.handleInputChange2} />
                    </div>
                </div>
            </form>
        );
    }

}

export default NameForm;
