import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { updateJob } from '../actions/JobActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UpdateNotesScreen = ({ match, history }) => {
  const jobId = match.params.id

  const dispatch = useDispatch()

  // useState hook here
  const [notes, setNotes] = useState('Please add some notes!')

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
    if (details && details.notes) {
      setNotes(details.notes)
    }
  }, [history, userInfo, details])

  // any local methods
  const onSubmitHandler = (e) => {
    e.preventDefault()
    // Dispatch jobProgress update here
    console.log('[updatenotes] it is in submit handler')
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
      details.hasApplied,
      details.heardBack,
      details.haveInterviewed,
      details.haveOffer,
      notes
    ))
    history.push(`/myjobs/${jobId}`)
  }

  return (
    <>
      <Link to={`/myjobs/${jobId}`} className='px-4'><i className="fas fa-arrow-left" style={{ height: '20px', width: '20px' }}></i>GO BACK</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {details && (
        <FormContainer>
          <h1 className='pb-3'>Update Notes</h1>
          <Form className='py-4 px-3' style={{ background: '#eb6864', borderRadius: '25px', color: 'white' }} onSubmit={onSubmitHandler}>
            <Form.Group >
              <Form.Label style={{ color: 'white' }}><h3>Your Notes</h3> </Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='dark' block>Save</Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default UpdateNotesScreen
