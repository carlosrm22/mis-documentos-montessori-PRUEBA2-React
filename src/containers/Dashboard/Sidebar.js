import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

/* Observaciones y Mejoras
Estructura del Sidebar:

La estructura del Sidebar está bien organizada y utiliza react - bootstrap y react - router - bootstrap correctamente para la navegación.
Clase sidebar - sticky:

La clase sidebar - sticky está presente pero no parece estar haciendo nada en el código mostrado.Asegúrate de que esta clase tenga estilos aplicados en tus archivos CSS para que tenga efecto.
Accesibilidad y Mejora Visual:

Podrías considerar añadir un icono o un indicador visual para cada enlace del Sidebar para mejorar la experiencia del usuario.
Estilo CSS:

Asegúrate de que la clase sidebar y cualquier otra clase utilizada en el Sidebar tengan estilos definidos en tu archivo CSS para mantener la consistencia del diseño. */
