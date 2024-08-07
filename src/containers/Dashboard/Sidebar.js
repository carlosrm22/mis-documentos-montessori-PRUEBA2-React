import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../styles/Sidebar.css';

/**
 * Componente Sidebar.
 * Proporciona enlaces de navegación a diferentes secciones del dashboard.
 */
const Sidebar = () => {
    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <LinkContainer to="/dashboard">
                    <Nav.Link>Inicio</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/aviso-privacidad">
                    <Nav.Link>Aviso de privacidad</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/contrato-reglamento">
                    <Nav.Link>Contrato y Reglamento</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/logout">
                    <Nav.Link>Cerrar Sesión</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
