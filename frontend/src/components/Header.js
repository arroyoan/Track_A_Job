import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../actions/UserActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant='dark' >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href="/">TRACK-A-JOB</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ?
                (
                  <NavDropdown title={userInfo.username} id='nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>My Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
