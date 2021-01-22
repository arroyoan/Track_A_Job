import {
  JOB_USERS_SUCCESS,
  JOB_USERS_REQUEST,
  JOB_USERS_FAIL,
  JOB_CREATE_FAIL,
  JOB_CREATE_SUCCESS,
  JOB_CREATE_REQUEST,
  JOB_DETAILS_FAIL,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_REQUEST,
  JOB_UPDATE_FAIL,
  JOB_UPDATE_SUCCESS,
  JOB_UPDATE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_REQUEST,
  JOB_DELETE_FAIL
} from '../constants/JobConstants'

import axios from 'axios'

export const getUserJobs = (keywords = '', pageNumber = '', sortBy = '', pageSize = '') => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/jobs/myjobs?pageNumber=${pageNumber}&keywords=${keywords}&sortBy=${sortBy}&pageSize=${pageSize}`, config)

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

export const getJobDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAILS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/jobs/${id}`, config)

    dispatch({
      type: JOB_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: JOB_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const updateJob = (
  id,
  jobTitle,
  jobUrl,
  jobDescription,
  companyJobId,
  companyName,
  jobCity,
  jobState,
  jobCountry,
  isImportant,
  hasApplied,
  heardBack,
  haveInterviewed,
  haveOffer,
  notes
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_UPDATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await axios.put(`/api/jobs/${id}`, {
      jobTitle,
      jobUrl,
      jobDescription,
      companyJobId,
      companyName,
      jobCity,
      jobState,
      jobCountry,
      isImportant,
      hasApplied,
      heardBack,
      haveInterviewed,
      haveOffer,
      notes
    }, config)

    dispatch({
      type: JOB_UPDATE_SUCCESS
    })

    dispatch({
      type: JOB_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: JOB_UPDATE_FAIL,
      error: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DELETE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/jobs/${id}`, config)

    dispatch({
      type: JOB_DELETE_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}
