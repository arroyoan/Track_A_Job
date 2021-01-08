import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import FormContainer from '../components/FormContainer'


const RegisterScreen = () => {
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form className='py-3'>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder='Enter Email' />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder='Enter Email' />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Enter Email' />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder='Enter Email' />
        </Form.Group>

        <Button className='btn btn-dark' type="submit" block>Register</Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account? <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>


  )
}

export default RegisterScreen
