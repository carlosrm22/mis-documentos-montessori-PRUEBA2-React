// src/components/Navbar.js

import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseConfig';

/**
 * Componente para la barra de navegación.
 */
function NavigationBar() {
  const [user] = useAuthState(auth);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <div className="pb-5">
      <Navbar bg="primary" variant="dark" expand="lg" expanded={expanded} fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Mi Cuenta Montessori
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto" onSelect={handleSelect}>
              <LinkContainer to="/">
                <Nav.Link>Inicio</Nav.Link>
              </LinkContainer>
              {user && (
                <>
                  <LinkContainer to="/aviso-privacidad">
                    <Nav.Link>Aviso de privacidad</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/contrato-reglamento">
                    <Nav.Link>Contrato y Reglamento</Nav.Link>
                  </LinkContainer>
                </>
              )}
              <LinkContainer to="/contacto">
                <Nav.Link>Contacto</Nav.Link>
              </LinkContainer>
              {!user ? (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Iniciar Sesión</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Registrarse</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/dashboard">
                    <Nav.Link>Mi Cuenta</Nav.Link>
                  </LinkContainer>
                  <Nav.Link as={Button} variant="link" onClick={() => auth.signOut()} className="text-white">
                    Cerrar Sesión
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
