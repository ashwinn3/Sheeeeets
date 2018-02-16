import React, { Component } from 'react';

const NameForm = class extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.props.setMethod([event.target.name], event.target.value);
    }

    render() {
        return (
            <form>
                <div className="field">
                    <label className="label">{this.props.label1}</label>
                    <div className="control">
                        <input className="input"
                            name="username"
                            type="textbox"
                            value={this.props.value1}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">{this.props.label2}</label>
                    <div className="control">
                        <input className="input"
                        name="password"
                        type="password"
                        value={this.props.value2}
                        onChange={this.handleInputChange} />
                    </div>
                </div>
            </form>
        );
    }

}

export default NameForm;
