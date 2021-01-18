import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { updateJob } from '../actions/JobActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UpdateProgressionScreen = ({ history, match }) => {
  const jobId = match.params.id

  const dispatch = useDispatch()

  // useState hook here
  const [hasApplied, setApplied] = useState(false)
  const [heardBack, setHeardBack] = useState(false)
  const [haveInterviewed, setHaveInterviewed] = useState(false)
  const [haveOffer, setHaveOffer] = useState(false)

  // redux state functionality
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const jobDetails = useSelector(state => state.jobDetails)
  const { jobDetails: details } = jobDetails

  const jobUpdate = useSelector(state => state.jobUpdate)
  const { loading, error } = jobUpdate


  // useEffect hook here
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (details) {
      setApplied(details.hasApplied)
      setHeardBack(details.heardBack)
      setHaveInterviewed(details.haveInterviewed)
      setHaveOffer(details.haveOffer)
    }
  }, [history, userInfo, details])

  // any local methods
  const onSubmitHandler = (e) => {
    e.preventDefault()
    // Dispatch jobProgress update here
    console.log('[updateprogressScreen] it is in submit handler')
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
      details.isImportant,
      hasApplied,
      heardBack,
      haveInterviewed,
      haveOffer,
      details.notes
    ))
    history.push(`/myjobs/${jobId}`)
  }

  return (
    <>
      <Link to={`/myjobs/${jobId}`} className='px-4'><i className="fas fa-arrow-left" style={{ height: '20px', width: '20px' }}></i>GO BACK</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {details && console.log(hasApplied, heardBack, haveInterviewed, haveOffer)}
      {details && (
        <FormContainer>
          <div style={{ background: '', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className='pb-3'>Update Job Progress</h1>
            <Form className='py-4 px-3' style={{ background: '#eb6864', borderRadius: '25px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '250px' }} onSubmit={onSubmitHandler}>
              <Form.Group style={{ display: 'flex', background: '', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                <Form.Label style={{ background: '' }}> <h3>Applied</h3> </Form.Label>
                <Form.Check
                  checked={hasApplied}
                  onChange={() => setApplied(!hasApplied)}
                ></Form.Check>
              </Form.Group>
              <Form.Group style={{ display: 'flex', background: '', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                <Form.Label style={{ background: '' }}> <h3>Contacted</h3> </Form.Label>
                <Form.Check
                  checked={heardBack}
                  onChange={() => setHeardBack(!heardBack)}
                ></Form.Check>
              </Form.Group>
              <Form.Group style={{ display: 'flex', background: '', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                <Form.Label style={{ background: '' }}> <h3>Interviewed</h3> </Form.Label>
                <Form.Check
                  checked={haveInterviewed}
                  onChange={() => setHaveInterviewed(!haveInterviewed)}
                ></Form.Check>
              </Form.Group>
              <Form.Group style={{ display: 'flex', background: '', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                <Form.Label style={{ background: '' }}> <h3>Offer</h3> </Form.Label>
                <Form.Check
                  checked={haveOffer}
                  onChange={() => setHaveOffer(!haveOffer)}
                ></Form.Check>
              </Form.Group>
              <Button type='submit' variant='dark' block>Save</Button>
            </Form>
          </div>

        </FormContainer>
      )}

    </>
  )
}

export default UpdateProgressionScreen
