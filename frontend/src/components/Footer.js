import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{ background: '#eb6864' }}>
      <Container>
        <Row>
          <Col className='text-center py-3' style={{ color: 'white' }}>
            Copyright &copy; Aaron arroyo
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
