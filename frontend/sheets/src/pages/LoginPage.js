import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoginControl from '../components/LoginControl.js'
import RegisterModal from '../components/RegisterModal.js'
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

const _LoginPage = class extends Component {


	constructor(...args) {
	    super(...args);
	    this.state = {
	        modalIsActive: false
	    };
	}

	toggleModal = () => {
		this.setState(
			(prevState, props) => {
          		return {modalIsActive : !prevState.modalIsActive};
        	}
    	)
	};
	render() {
	    return <div className="section hero">
	    			<div className="container title is-1"> Sheets</div>
	    			<div className="container">
	    				<LoginControl method={this.props.method} toggleRegister={this.toggleModal}/>
	    			</div>
	    			<RegisterModal isActive={this.props.registerIsToggled}/>
	    		</div>;
    }

}
const LoginPage = connect(mapStateToProps, mapDispatchToProps)(_LoginPage)

export default LoginPage;
