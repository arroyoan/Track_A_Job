import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

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

  //useEffect hoook stuff
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserJobs())
    } else {
      //gonna redirect to login page
      console.log('inm homescreen elase')
    }

  }, [dispatch, userInfo])

  // local methods

  return (
    <>
      <div className='py-3' style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 >Your Applications</h4>
        <Button className='btn'>+ New App</Button>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {!jobs ?
        (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <h1>You have no job applications!</h1>
          </div>

        ) : (
          <Table striped hover bordered >
            <thead>
              <tr className='text-center'>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Applied</th>
                <th>Interviewed</th>
                <th>Offer</th>
                <th>Job Details</th>
              </tr>
            </thead>
            <tbody>
              {
                jobs.map((job) => {
                  return (
                    <tr key={job._id} className='text-center'>
                      <td>{job.jobTitle}</td>
                      <td>{job.companyName}</td>
                      <td className='align-middle'>
                        {job.hasApplied ? (
                          <i className='fas fa-check' style={{ color: 'green' }}></i>
                        ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                      </td>
                      <td className='align-middle text-center'>
                        {job.hasInterviewed ? (
                          <i className='fas fa-check' style={{ color: 'green' }}></i>
                        ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                      </td>
                      <td className='align-middle text-center'>
                        {job.hasoffer ? (
                          <i className='fas fa-check' style={{ color: 'green' }}></i>
                        ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                      </td>
                      <td>Details</td>
                    </tr>)
                })
              }
            </tbody>
          </Table>
        )}
    </>
  )
}

export default HomeScreen
