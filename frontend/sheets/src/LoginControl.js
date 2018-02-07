import React, { Component } from 'react';
import NameForm from './NameForm.js';

const hash = require('js-hash-code');

const LoginControl = class extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {  isLoggedIn: false,
                    loginFailed: false,
                    name: "niklas",
                    pass: "hello",
                    id: ""};
  }
  request = function(user,password) {
//       if(user === "test_user" && password == "pass") {
//        return {login: true};
//       } else {
//        return {login: false};
//       }



      return fetch("http://localhost:8080/login?username=" + this.state.name + "&password=" + this.state.pass, {
        method: "GET",
      })
//      .then( response => {
//        console.log("response:", response);
//        if(!response.ok) {
//          throw Error("API call failed");
//        }
//        return response;
//      })
      .then(r => r.json())
      .then(response => {
        console.log('Response: '+ response['response'])
        if (response['response'] === "Login Success") {
            return true;
        } else {
            return false;
        }
//        if(!response.login) {
//          throw Error("Wrong Password");
//        }
        //return response;
      })
      .catch((e) => {
          console.log("Error occused while logging in:"+ e);
        }
      );
  }



  handleLoginClick() {
    const scope = this;
    this.setState({isLoggedIn: true});
    this.request(this.state.name,this.state.pass).then(function(response) {
        if (response) {
          scope.setState({
            isLoggedIn: true,
            loginFailed : false,
            id: 'user-id'
          })
          scope.props.method({login: true});
        } else {
          scope.setState({
            loginFailed : true
          });

        }
    });
//    .then(
//      (r) => {
//        if (r && r.login) {
//          this.setState({
//            isLoggedIn: true,
//            loginFailed : false,
//            id: r.id
//          })
//          scope.props.method(r);
//        } else {
//          this.setState({
//            loginFailed : true
//          });
//
//        }
//      }
//    )
  }



  handleFormSubmit(name,value) {
    if (name === "name") this.setState( {name:value});
    if (name === "pass") this.setState( {pass:value});
  }

  render() {
    let failedText = null;
    if (this.state.loginFailed) failedText = <div className="has-text-danger is-size-4 has-text-weight-bold">Login Failed</div>;
    return (
      <div>
        <h1 className="title">Please sign in.</h1>
        <NameForm method={this.handleFormSubmit} />
        <br/>
        <div className="field is-grouped">
          <p className="control">
            <button onClick={this.handleLoginClick} className="button is-success">Login</button>
          </p>
          <p className="control">
            <button onClick={this.props.toggleRegister} className="button is-link">Register</button>
          </p>
        </div>
         {failedText}
      </div>
    );
  }
}




export default LoginControl;
