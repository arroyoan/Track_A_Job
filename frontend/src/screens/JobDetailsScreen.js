import React, { useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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

  // local methods

  // const markImportantHandler = ()=>{

  // }

  return (
    <>
      <Link to='/myjobs' className='px-4'><i className="fas fa-arrow-left" style={{ height: '20px', width: '20px' }}></i>GO BACK</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      {details && (
        <Container className='py-3 px-5'>
          <Row>
            <Col>
              <div className='align-items-center' style={{ display: 'flex', margin: '0' }}>
                <h1 style={{ fontSize: '50px', paddingRight: '13px' }}>{details.jobTitle}</h1>
                <i className="far fa-star " style={{ paddingTop: '11px', cursor: 'pointer' }}></i>
              </div>
              <p className='pl-2' style={{ fontSize: '14px' }}>Job Id: {details.companyJobId} </p>
            </Col>
          </Row>
          <Row>
            <Col className='pl-4'>

              {/* this is the header for details */}
              <div className="edit pb-2" style={{ display: 'flex', width: '115px' }}>
                <h2 className='pr-2' style={{ color: '#eb6864' }}>Details</h2>
                <LinkContainer to={`/updatejob/${jobId}`}><i className='fas fa-edit pt-3'></i></LinkContainer>
              </div>

              {/* This is for company */}
              <h6 className='pl-2 pr-2'>Company</h6>
              <p className='px-3'>{details.companyName}</p>

              {/* this is for location */}

              <h6 className='pl-2 pr-2'>Location</h6>
              <p className='px-3'>{details.jobCity}, {details.jobState}, {details.jobCountry}</p>

              {/* this is for job url */}

              <h6 className='pl-2 pr-2'>Job URL</h6>
              <p className='px-3'> <a href={details.jobUrl}>{details.jobUrl}</a></p>

              {/* this is for job description */}

              <h6 className='pl-2 pr-2'>Description</h6>
              <p className='px-3'>{details.jobDescription}</p>
            </Col>
          </Row>

          <Row>
            <Col className='pl-4'>
              <div className="edit pb-2" style={{ display: 'flex', width: '200px' }}>
                <h2 className='pb-3 pr-2' style={{ color: '#eb6864' }}>Your Progress</h2>
                <LinkContainer to={`/updateprogress/${jobId}`}><i className='fas fa-edit pt-3'></i></LinkContainer>
              </div>

              <Table style={{ paddingLeft: '70px' }}>
                <thead className='text-center'>
                  <tr>
                    <td>Applied</td>
                    <td>Contacted</td>
                    <td>Interviewed</td>
                    <td>Offer</td>
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
                      {details.heardBack ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td className='align-middle text-center'>
                      {details.haveInterviewed ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td className='align-middle text-center'>
                      {details.haveOffer ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col className='pl-4'>
              <div className="edit pb-2" style={{ display: 'flex', width: '200px' }}>
                <h2 className='pb-3 pr-2' style={{ color: '#eb6864' }}>Your Notes</h2>
                <LinkContainer to={`/addnotes/${jobId}`}><i className='fas fa-edit pt-3'></i></LinkContainer>
              </div>
              <p className='px-3'>No Notes at the moment!</p>
            </Col>
          </Row>
        </Container >
      )}

    </>

  )
}

export default JobDetailsScreen
