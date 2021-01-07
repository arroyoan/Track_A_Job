import React from 'react'
import { Form, Button } from 'react-bootstrap'


const RegisterScreen = () => {
  return (

    <Form>
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

      <Button className='btn' type="submit" block>Register</Button>
    </Form>
  )
}

export default RegisterScreen
