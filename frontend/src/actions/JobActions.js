import {
  JOB_USERS_SUCCESS,
  JOB_USERS_REQUEST,
  JOB_USERS_FAIL
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