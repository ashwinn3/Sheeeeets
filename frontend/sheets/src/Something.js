import React from 'react'
import { connect } from 'react-redux'
import { login } from './actions'
import Something2 from './Something2'


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

const Something = connect(mapStateToProps, mapDispatchToProps)(Something2)

export default Something