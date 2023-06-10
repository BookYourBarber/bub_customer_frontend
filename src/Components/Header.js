import React from "react";
import {Navbar, Container} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Logout from './Logout';

function Header() {
  const { isAuthenticated, user} = useAuth0();

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Barbers</Navbar.Brand>
          </Link>
          <Nav className="justify-content-end">
            <Nav.Link >{isAuthenticated ? (
            <>
              <p style={{color: 'white'}}>Hello {user.given_name}</p>
              <Logout /> 
            </>
          ):
            <Login/>
          }</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
  
  export default Header;