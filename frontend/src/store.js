import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers to be imported
import { } from './reducers/JobReducers'
import {
  userLoginReducer,
  userRegisterReducer
} from './reducers/UserReducers'

// reducers to combined here
const reducer = combineReducers({
  // Below is an example
  // jobDelete:JobDeleteReducer
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
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