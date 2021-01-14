import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/UserActions'


const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch()

  // useState hook information 
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // redux state values
  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister


  // useEffect hook function
  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  // local state functionality
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords Do Not Match')
    } else {
      dispatch(register(email, username, password))
    }
  }

  return (
    <FormContainer>
      <div className='py-2' style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Sign Up</h1>
      </div>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      <Form className='py-3 px-3' style={{ background: '#eb6864', borderRadius: '25px', color: 'white' }} onSubmit={submitHandler} >
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder='Enter Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Text className='px-2' style={{ color: 'white' }}>Passwords must be at least 8 characters long</Form.Text>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button className='btn btn-dark' type="submit" block>Register</Button>
      </Form>
      <Row className='py-3 text-center'>
        <Col>
          Already have an account? <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>


  )
}

export default RegisterScreen
