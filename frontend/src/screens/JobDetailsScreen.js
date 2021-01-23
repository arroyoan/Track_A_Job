import React, { useEffect } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getJobDetails, updateJob, deleteJob } from '../actions/JobActions'
import { JOB_DELETE_RESET } from '../constants/JobConstants'

const JobDetailsScreen = ({ history, match }) => {
  const jobId = match.params.id

  const dispatch = useDispatch()

  // useState hook info for changing the info

  // useSelector functionality
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const jobDetails = useSelector(state => state.jobDetails)
  const { loading, error, jobDetails: details } = jobDetails

  const jobDelete = useSelector(state => state.jobDelete)
  const { loading: deleteLoading, error: deleteError, success } = jobDelete

  // useEffect hook
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getJobDetails(jobId))
    }

    if (success) {
      dispatch({
        type: JOB_DELETE_RESET
      })
      history.push('/myjobs')
    }
  }, [userInfo, history, dispatch, jobId, success])

  // local methods

  const markImportantHandler = () => {
    dispatch(updateJob(
      jobId,
      details.jobTitle,
      details.jobUrl,
      details.jobDescription,
      details.companyJobId,
      details.companyName,
      details.jobCity,
      details.jobState,
      details.jobCountry,
      !details.isImportant,
      details.hasApplied,
      details.heardBack,
      details.haveInterviewed,
      details.haveOffer,
      details.notes
    ))
  }

  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      //dispatch delete job application action
      console.log('deleted application')
      dispatch(deleteJob(jobId))
    }
  }

  // creates last updated string
  let dateInfo = ''
  if (details) {
    let substringDate = details.updatedAt.substring(0, 10)
    dateInfo = substringDate.split('-')
    dateInfo = `${dateInfo[1]}-${dateInfo[2]}-${dateInfo[0]}`
  }

  return (
    <>
      <Link to='/myjobs' className='px-4'><i className="fas fa-arrow-left" style={{ height: '20px', width: '20px' }}></i>GO BACK</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {deleteLoading && <Loader />}

      {details && (
        <Container className='py-3 px-5'>
          <Row>
            <Col>
              <div className='align-items-center' style={{ display: 'flex', margin: '0' }}>
                <h1 style={{ fontSize: '50px', paddingRight: '13px' }}>{details.jobTitle}</h1>
                {details.isImportant ? (
                  <i onClick={() => markImportantHandler()} className="fas fa-star " style={{ paddingTop: '11px', cursor: 'pointer', color: 'goldenrod' }}></i>
                ) : (
                    <i onClick={() => markImportantHandler()} className="far fa-star " style={{ paddingTop: '11px', cursor: 'pointer' }}></i>
                  )}
              </div>
              <p className='pl-2' style={{ fontSize: '14px', margin: '0px' }}>Job Id: {details.companyJobId} </p>
              <p className='pl-2' style={{ fontSize: '14px' }}>Last Updated: {dateInfo} </p>
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
              <div className="edit pb-2" style={{ display: 'flex', width: '250px' }}>
                <h2 className='pb-3 pr-2' style={{ color: '#eb6864' }}>Your Progress</h2>
                <LinkContainer to={`/updateprogress/${jobId}`}><i className='fas fa-edit pt-3'></i></LinkContainer>
              </div>

              <Table>
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
                <h2 className='pb-2 pr-2' style={{ color: '#eb6864' }}>Your Notes</h2>
                <LinkContainer to={`/addnotes/${jobId}`}><i className='fas fa-edit pt-3'></i></LinkContainer>
              </div>
              {details.notes ? (
                <p className='px-3'>{details.notes}</p>
              ) : (
                  <p className='px-3'>No Notes at the moment!</p>
                )}

            </Col>
          </Row>

          <Row>
            <Col>
              <div className="pl-2 pt-3" >
                <h2 className='pb-3 pr-2' style={{ color: '#eb6864' }}>Delete</h2>
                <div className='pl-3'>
                  <Button onClick={deleteHandler}>Delete Application!</Button>
                </div>
              </div>
            </Col>
          </Row>

        </Container >
      )}

    </>

  )
}

export default JobDetailsScreen
