import React from "react";
import {Navbar, Container} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function Header() {
    return (
      <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/"><Navbar.Brand>Barbers</Navbar.Brand></Link>
        <Nav className="me-auto">
          {/* <Nav.Link></Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
    );
  }
  
  export default Header;