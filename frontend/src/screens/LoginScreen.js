import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginScreen = () => {
  return (
    <div>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder='Enter Email' />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Enter Email' />
        </Form.Group>

        <Button className='btn' type="submit" block>Sign In</Button>
      </Form>
    </div>
  )
}

export default LoginScreen
