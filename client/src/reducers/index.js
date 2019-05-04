import {combineReducers} from 'redux'
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profileReducers from './profileReducers'
 

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducers

})
 

