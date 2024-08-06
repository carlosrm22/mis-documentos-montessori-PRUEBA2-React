import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebaseConfig';

/**
 * Componente para la barra de navegación.
 * Muestra diferentes enlaces dependiendo del estado de autenticación del usuario.
 */
function NavigationBar() {
  const [user] = useAuthState(auth);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  /**
   * Maneja el evento de clic para expandir/colapsar el Navbar.
   */
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  /**
   * Cierra el Navbar al seleccionar un enlace.
   */
  const handleSelect = () => {
    setExpanded(false);
  };

  // Cierra el Navbar al seleccionar fuera de él
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="pb-5" ref={navbarRef}>
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
              {user && (
                <div style={{ fontSize: 'smaller', fontStyle: 'italic', marginTop: '5px' }}>
                  {user.email}
                </div>
              )}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto" onSelect={handleSelect}>
              <LinkContainer to="/dashboard">
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