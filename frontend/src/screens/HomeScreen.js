import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


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
      history.push('/login')
    }

  }, [dispatch, userInfo, history])

  // local methods

  return (
    <>
      <div className='py-3 pr-1' style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Your Applications</h4>
        <Link className='appButton' to='/addjob' >+ New App</Link>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      {!jobs || jobs.length === 0 ?
        (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: '15px' }}>
            <h1>You have no job applications!</h1>
          </div>

        ) : (
          <>
            <Table striped hover bordered responsive>
              <thead style={{ background: '#eb6864', color: 'white' }}>
                <tr className='text-center'>
                  <th> <strong>Job</strong></th>
                  <th> <strong>Job Id</strong></th>
                  <th><strong>Company</strong></th>
                  <th><strong>Applied</strong></th>
                  <th><strong>Interviewed</strong></th>
                  <th><strong>Offer</strong></th>
                  <th><strong>Details</strong></th>
                </tr>
              </thead>
              <tbody style={{ background: 'white' }}>
                {
                  jobs.map((job) => {
                    return (
                      <tr key={job._id} className='text-center'>
                        <td>{job.jobTitle}</td>
                        <td>{job.companyJobId}</td>
                        <td>{job.companyName}</td>
                        <td className='align-middle text-center'>
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
                        <td className='align-middle text-center'>
                          <Link to={`/myjobs/${job._id}`} style={{ color: '#369' }}>Details</Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <h1 className='align-middle text-center'>Pagination</h1>
          </>
        )}
    </>
  )
}

export default HomeScreen
