import React from 'react'
import { connect } from 'react-redux'
import { login, attemptLogin } from '../states/actions'
import Something_view from './Something_view'


const mapStateToProps = (state, ownProps) => {

  return {
    string: state.session.id,

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (val) => {
      dispatch(login(val))
    },
    onClick2: (val) => {
      dispatch(attemptLogin(val))
    }
  }
}

const Something = connect(mapStateToProps, mapDispatchToProps)(Something_view)

export default Something