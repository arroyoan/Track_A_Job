import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers to be imported
import {
  userJobsReducer,
  createJobReducer,
  jobDetailsReducer,
  jobUpdateReducer,
  jobDeleteReducer
} from './reducers/JobReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer
} from './reducers/UserReducers'

// reducers to combined here
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userJobs: userJobsReducer,
  createJob: createJobReducer,
  jobDetails: jobDetailsReducer,
  jobUpdate: jobUpdateReducer,
  jobDelete: jobDeleteReducer,
})

// Local storage things
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


// make initial state from local storage
let initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

// any middle needed goes here
let middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store