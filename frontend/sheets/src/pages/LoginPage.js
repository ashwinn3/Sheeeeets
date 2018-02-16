import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoginControl from '../components/LoginControl.js'
import RegisterModal from '../components/RegisterModal.js'
import { showMessageModal } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
    	registerIsToggled: state.login.registerIsToggled,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		showMessageModal: (message) => {
			dispatch(showMessageModal(message));
		}
	}
}

const _LoginPage = class extends Component {


	constructor(...args) {
	    super(...args);
	    this.state = {
	        modalIsActive: false
	    };
	    this.gogo = this.gogo.bind(this);

	}
	gogo() {
        this.props.showMessageModal('Login successful');
    }

	render() {
	    return <div className="section hero">
	    			<div className="container title is-1"> Sheets</div>
	    			<button onClick={this.gogo}>Click me</button>
	    			<div className="container">
	    				<LoginControl method={this.props.method}/>
	    			</div>
	    			<RegisterModal isActive={this.props.registerIsToggled}/>
	    		</div>;
    }

}
const LoginPage = connect(mapStateToProps, mapDispatchToProps)(_LoginPage)

export default LoginPage;
