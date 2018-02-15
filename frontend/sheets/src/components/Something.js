import React from 'react'
import { connect } from 'react-redux'
import { login } from '../states/actions'
import Something_view from './Something_view'


const mapStateToProps = (state, ownProps) => {
  console.log('State');
  console.log(state);
  return {
    string: state.sessionControl.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (val) => {
      dispatch(login(val))
    }
  }
}

const Something = connect(mapStateToProps, mapDispatchToProps)(Something_view)

export default Something