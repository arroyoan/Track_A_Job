import {
  JOB_USERS_SUCCESS,
  JOB_USERS_REQUEST,
  JOB_USERS_FAIL,
  JOB_CREATE_FAIL,
  JOB_CREATE_SUCCESS,
  JOB_CREATE_REQUEST
} from '../constants/JobConstants'

import axios from 'axios'

export const getUserJobs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_USERS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get('/api/jobs/myjobs', config)
    dispatch({
      type: JOB_USERS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: JOB_USERS_FAIL,
      error: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const createJob = (jobTitle, jobUrl, jobDescription, companyJobId, companyName, jobCity, jobState, jobCountry) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_CREATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post('/api/jobs/', {
      jobTitle,
      jobUrl,
      jobDescription,
      companyJobId,
      companyName,
      jobCity,
      jobState,
      jobCountry
    }, config)

    dispatch({
      type: JOB_CREATE_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: JOB_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}