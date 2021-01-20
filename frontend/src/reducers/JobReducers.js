import {
  JOB_USERS_FAIL,
  JOB_USERS_REQUEST,
  JOB_USERS_SUCCESS,
  JOB_USERS_RESET,
  JOB_CREATE_FAIL,
  JOB_CREATE_REQUEST,
  JOB_CREATE_SUCCESS,
  JOB_CREATE_RESET,
  JOB_DETAILS_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_RESET,
  JOB_UPDATE_FAIL,
  JOB_UPDATE_REQUEST,
  JOB_UPDATE_SUCCESS,
  JOB_DELETE_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_RESET
} from '../constants/JobConstants'

export const userJobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_USERS_REQUEST:
      return { loading: true }
    case JOB_USERS_SUCCESS:
      return {
        loading: false,
        jobs: action.payload.jobs,
        page: action.payload.page,
        pages: action.payload.pages
      }
    case JOB_USERS_FAIL:
      return { loading: false, error: action.payload }
    case JOB_USERS_RESET:
      return {}
    default:
      return state
  }
}

export const createJobReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case JOB_CREATE_REQUEST:
      return { loading: true }
    case JOB_CREATE_SUCCESS:
      return { loading: false, success: true }
    case JOB_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case JOB_CREATE_RESET:
      return {}
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
    case JOB_DETAILS_RESET:
      return {}
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

export const jobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_DELETE_REQUEST:
      return { loading: true }
    case JOB_DELETE_SUCCESS:
      return { loading: false, success: true }
    case JOB_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case JOB_DELETE_RESET:
      return {}
    default:
      return state
  }
}