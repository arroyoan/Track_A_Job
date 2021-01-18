import {
  JOB_USERS_FAIL,
  JOB_USERS_REQUEST,
  JOB_USERS_SUCCESS,
  JOB_CREATE_FAIL,
  JOB_CREATE_REQUEST,
  JOB_CREATE_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_UPDATE_FAIL,
  JOB_UPDATE_REQUEST,
  JOB_UPDATE_SUCCESS,
  JOB_UPDATE_PROGRESS_FAIL,
  JOB_UPDATE_PROGRESS_REQUEST,
  JOB_UPDATE_PROGRESS_SUCCESS
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

export const createJobReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case JOB_CREATE_REQUEST:
      return { loading: true }
    case JOB_CREATE_SUCCESS:
      return { loading: false }
    case JOB_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const jobDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_DETAILS_REQUEST:
      return { loading: true }
    case JOB_DETAILS_SUCCESS:
      return { loading: false, jobDetails: action.payload }
    case JOB_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const jobUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_UPDATE_REQUEST:
      return { loading: true }
    case JOB_UPDATE_SUCCESS:
      return { loading: false }
    case JOB_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}