import axios from 'axios'


export const createProfile = (profileData, history) => dispatch => {
axios.post('/api/profile/', profileData )
.then(profile => history.push('/dashboard')  )
.catch(err => dispatch({
  type: 'GET_ERRORS',
  payload: err.response.data
}) )
}

export const getCurrentProfile = () => dispatch => {
dispatch({
  type: 'SET_PROFILE_LOADING'
})
axios.get('/api/profile')
.then(profile => dispatch({
  type: 'GET_PROFILE',
  payload: profile.data
}))
.catch(err => dispatch({
  type: 'GET_PROFILE',
  payload: {}
}) )

}