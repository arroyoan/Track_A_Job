import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserJobs } from '../actions/JobActions'

const HomeScreen = ({ history, location }) => {
  const dispatch = useDispatch()

  // Get state from store
  const userJobs = useSelector(state => state.userJobs)
  const { loading, error, jobs } = userJobs

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // useEffect hoook stuff
  // useEffect(() => {
  //   if (!userInfo) {
  //     //gonna redirect to login page
  //     console.log('[HomeScreen] it is in the useEffect')
  //   }
  //   dispatch(getUserJobs())
  // }, [dispatch, userInfo])

  // local methods


  return (
    <>
      <div className='py-3' style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 >Your Applications</h4>
        <Button className='btn'>+ New App</Button>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <h1>This is where the table would go!!</h1>
    </>
  )
}

export default HomeScreen
