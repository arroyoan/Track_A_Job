import {
  JOB_USERS_FAIL,
  JOB_USERS_REQUEST,
  JOB_USERS_SUCCESS,
  JOB_CREATE_FAIL,
  JOB_CREATE_REQUEST,
  JOB_CREATE_SUCCESS
} from '../constants/JobConstants'

export const userJobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_USERS_REQUEST:
      return { loading: true }
    case JOB_USERS_SUCCESS:
      return { loading: false, jobs: action.payload }
    case JOB_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createJobReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_CREATE_REQUEST:
      return { loading: true }
    case JOB_CREATE_SUCCESS:
      return { loading: false, success: true }
    case JOB_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}