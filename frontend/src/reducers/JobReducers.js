import {
  JOB_USERS_FAIL,
  JOB_USERS_REQUEST,
  JOB_USERS_SUCCESS
} from '../constants/JobConstants'

export const userJobsReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_USERS_REQUEST:
      return { loading: true }
    case JOB_USERS_SUCCESS:
      return { loading: false, userJobs: action.payload }
    case JOB_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}