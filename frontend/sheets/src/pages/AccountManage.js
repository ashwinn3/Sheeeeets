import React, { Component } from 'react';
import { connect } from 'react-redux'
import AccountControl from '../components/AccountControl.js'
import PasswordModal from '../components/PasswordModal.js'
import EmailModal from '../components/EmailModal.js'


const mapStateToProps = (state, ownProps) => {
    return {
    	emailIsToggled: state.account.emailIsToggled,
    	passwordIsToggled: state.account.passwordIsToggled,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
	}
}

const _AccountManage = class extends Component {


	constructor(...args) {
	    super(...args);
	    this.state = {
	        modalIsActive: false
	    };

	}
	gogo() {
        this.props.showMessageModal('Login successful');
    }

	render() {
	    return <div className="section hero">
	    			<div className="container title is-1"> Sheets</div>
	    			<div className="container">
	    				<AccountControl method={this.props.method}/>
	    			</div>
	    			<PasswordModal isActive={this.props.passwordIsToggled}/>
	    			<EmailModal isActive={this.props.emailIsToggled}/>
	    		</div>;
    }

}
const AccountManage = connect(mapStateToProps, mapDispatchToProps)(_AccountManage)

export default AccountManage;
