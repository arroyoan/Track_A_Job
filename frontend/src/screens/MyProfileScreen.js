import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getUserDetails, updateUser } from '../actions/UserActions'
import { USER_UPDATE_RESET } from '../constants/UserConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const MyProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  // useState hook
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  // geting state from redux
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: updateLoading, error: updateError, success } = userUpdate

  // useEffect hook stuff
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (user && user.username) {
        setEmail(user.email)
        setUsername(user.username)
      } else {
        dispatch(getUserDetails())
      }
    }
    if (success) {
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }, [dispatch, userInfo, history, user, success])

  // local methods
  const onSubmitHandler = (e) => {
    e.preventDefault()

    // this set message removes the message from the top if submitting a second time
    setMessage('')

    // confirms the new password was typed correctly
    if (newPassword !== confirmPassword) {
      setMessage('New password and Confrim Password do not match')
    } else {
      dispatch(updateUser({ username, email, oldPassword, password: newPassword }))
    }
  }

  // This is to clear the success header if user updates profile
  const clearHandler = () => {
    dispatch({
      type: USER_UPDATE_RESET
    })
  }

  return (
    <div className='px-4'>
      <Link to='/myjobs' onClick={clearHandler}> <i className='fas fa-arrow-left' style={{ height: '20px', width: '20px' }}></i>Go Back</Link>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}

      {success && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader />}
      {updateLoading && <Loader />}
      {updateError && <Message variant='danger'>{updateError}</Message>}

      <div className='pt-2 pb-4'>
        <FormContainer>
          <h2 className='pb-2 px-2' style={{ color: 'black' }}>Your Profile</h2>
          <Form className='py-4 px-3' style={{ background: '#eb6864', borderRadius: '25px', color: 'white' }} onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label className='px-1'><strong>Email</strong></Form.Label>
              <Form.Control
                type='email'
                placeholder={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              ></Form.Control>
              <Form.Text className='px-3' style={{ fontSize: '12px' }}>Can't change email, it's here if you need to copy it!</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label className='px-1'><strong>Username</strong></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Email'
                value={username}
                onChange={e => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className='px-1'><strong>Old Password</strong></Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Old Password'
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className='px-1'><strong>New Password</strong></Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter New Password'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              ></Form.Control>
              <Form.Text className='px-3' style={{ fontSize: '12px' }}>New Password must be at least 8 characters!</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label className='px-1'><strong>Confirm New Password</strong></Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='dark' block>Update Profile</Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  )
}

export default MyProfileScreen
