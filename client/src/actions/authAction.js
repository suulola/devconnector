import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken';


export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
  .then(res => history.push('/login'))
  .catch(err => dispatch({
    type: 'GET_ERRORS',
    payload: err.response.data
  }))
};

export const loginUser = (userData, history) => dispatch => {
  axios.post('/api/users/login', userData)
  .then(res => {
    const {token} = res.data
    // save to localStorage
    localStorage.setItem('jwtToken', token)
    //set token to auth header
    setAuthToken(token)
    // get the user data out of the token
    const decoded = jwt_decode(token)
    // set the current user to the user data
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: decoded
    })
    history.push('/dashboard')


  } )
  .catch( err => dispatch({
    type: 'GET_ERRORS',
    payload: err.response.data
  }))
}

export const logoutUser = () => dispatch => {
  // remove from localStorage
  localStorage.removeItem('jwtToken')
  //remove authorization from header
  setAuthToken(false)
  // OR delete axios.defaults.headers.common['Authorization'] - you ll need to import axios tho
  //remove the user from state
  dispatch({
    type: 'SET_CURRENT_USER',
    payload: {}
  })

}