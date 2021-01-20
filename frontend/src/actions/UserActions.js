import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_DETAILS_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST
} from '../constants/UserConstants'

import { JOB_DETAILS_RESET, JOB_USERS_RESET } from '../constants/JobConstants'

import axios from 'axios'

export const login = (email, password) => (async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/users/login', { email, password }, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })

  }
})

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_REGISTER_RESET })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: JOB_DETAILS_RESET })
  dispatch({ type: JOB_USERS_RESET })
}

export const register = (email, username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const { data } = await axios.post('/api/users/register', { email, username, password }, config)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    console.error(error)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/users/profile`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put('/api/users/profile', user, config)

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, token: userInfo.token }
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}