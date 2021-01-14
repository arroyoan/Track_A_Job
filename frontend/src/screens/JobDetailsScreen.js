import React, { useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
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
      {details && console.log(details.jobTitle)}

      {details && (
        <Container className='py-3 px-5'>
          <Row>
            <Col>
              <h1 style={{ fontSize: '50px' }}>{details.jobTitle}</h1>
              <p>Job Id: {details.companyJobId} </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className='pb-2' style={{ color: '#eb6864' }}>Details</h2>
              <h6 className='pl-2'>Company</h6>
              <p className='px-3'>{details.companyName}</p>
              <h6 className='pl-2'>Location:</h6>
              <p className='px-3'>{details.jobCity}, {details.jobState}, {details.jobCountry}</p>
              <h6 className='pl-2'>Job URL:</h6>
              <p className='px-3'> <a href={details.jobUrl}>{details.jobUrl}</a></p>
              <h6 className='pl-2'>Job Description:</h6>
              <p className='px-3'>{details.jobDescription}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className='pb-3' style={{ color: '#eb6864' }}>Your Progress</h2>
              <Table >
                <thead className='text-center'>
                  <tr>
                    <td>Applied</td>
                    <td>Contacted</td>
                    <td>Interviewed</td>
                    <td>Offer</td>
                    <td>Hired!</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='align-middle text-center'>
                      {details.hasApplied ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td className='align-middle text-center'>
                      {details.hasHeardBack ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td className='align-middle text-center'>
                      {details.hasInterview ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td className='align-middle text-center'>
                      {details.hasOffer ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td className='align-middle text-center'>
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 style={{ color: '#eb6864' }}>Your Notes</h2>
              <p className='px-3'>No Notes at the moment!</p>
            </Col>
          </Row>
        </Container>
      )}

    </>

  )
}

export default JobDetailsScreen
