import React, { useEffect, useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { createJob as newJob } from '../actions/JobActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { JOB_CREATE_RESET } from '../constants/JobConstants'


const AddJobScreen = ({ history }) => {
  const dispatch = useDispatch()

  // useState hook information
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [companyJobId, setCompanyJobId] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [jobCity, setJobCity] = useState('')
  const [jobState, setJobState] = useState('')
  const [jobCountry, setJobCountry] = useState('')

  // useSelector functionality
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const createJob = useSelector(state => state.createJob)
  const { loading, error, success } = createJob

  // useEffect hook 
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (success) {
      dispatch({
        type: JOB_CREATE_RESET
      })
      history.push('/myjobs')
    }
  }, [history, userInfo, success, dispatch])

  // local methods if needed
  const onSubmitHandler = (e) => {
    e.preventDefault()
    // dispatch createJob action here
    dispatch(newJob(jobTitle, jobUrl, jobDescription, companyJobId, companyName, jobCity, jobState, jobCountry))
  }

  return (
    <>
      <Link to='/myjobs' className='px-4'><i className="fas fa-arrow-left" style={{ height: '20px', width: '20px' }}></i>GO BACK</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <div className='pt-2 pb-4'>
        <FormContainer>
          <h2 className='pb-2 px-2' style={{ color: 'black' }}>New Job Application</h2>
          <Form className='py-4 px-3' style={{ background: '#eb6864', borderRadius: '25px', color: 'white' }} onSubmit={onSubmitHandler}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label className='px-1'><strong>Job Title</strong></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Job Title'
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className='px-1'><strong>Job Id</strong></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Job Id'
                    value={companyJobId}
                    onChange={e => setCompanyJobId(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className='px-1'><strong>Company</strong></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Company'
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group>
              <Form.Label><strong>Job URL</strong></Form.Label>
              <Form.Control
                type='url'
                placeholder='Enter URL to the Application!'
                value={jobUrl}
                onChange={e => setJobUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label className='px-1'><strong>City</strong></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='City'
                    value={jobCity}
                    onChange={e => setJobCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className='px-1'><strong>State</strong></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='State'
                    value={jobState}
                    onChange={e => setJobState(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className='px-1'><strong>Country</strong></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Country'
                    value={jobCountry}
                    onChange={e => setJobCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group className='py-1'>
              <Form.Label className='px-1' ><strong>Job Description</strong></Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Add a job description!'
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='dark' block style={{ fontSize: '20px' }}>Submit</Button>
          </Form>
        </FormContainer>
      </div>
    </>
  )
}

export default AddJobScreen
