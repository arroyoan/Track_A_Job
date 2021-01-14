import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getJobDetails } from '../actions/JobActions'

const JobDetailsScreen = ({ history, match }) => {
  const jobId = match.params.id

  const dispatch = useDispatch()

  // useState hook info for changing the info

  // useSelector functionality
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const jobDetails = useSelector(state => state.jobDetails)
  const { loading, error, jobDetails: details } = jobDetails

  // useEffect hook
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getJobDetails(jobId))
    }
  }, [userInfo, history, dispatch, jobId])

  // local method

  return (
    <>
      <Link to='/myjobs' className='px-4'><i className="fas fa-arrow-left" style={{ height: '20px', width: '20px' }}></i>GO BACK</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {details && console.log(details)}
      <Container>
        <h1>Hello this is your job application</h1>
      </Container>
    </>

  )
}

export default JobDetailsScreen
