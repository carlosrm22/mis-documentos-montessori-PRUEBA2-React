import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useGlobalState } from '../../utils/GlobalState';
import withAuth from '../../hoc/withAuth';

/**
 * Componente principal del Dashboard.
 * Proporciona una vista general de la aplicación y enlaces a diferentes secciones.
 */
const Dashboard = () => {
    const { user } = useGlobalState(); // Obtener el estado global del usuario

    return (
        <Container fluid className="p-0">
            <Row noGutters>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                    <h1>Bienvenido, {user?.email}</h1> {/* Mostrar el email del usuario */}
                    <p>Aquí puedes gestionar tus documentos y datos.</p>
                    {/* Aquí puedes agregar más contenido del dashboard */}
                </Col>
            </Row>
        </Container>
    );
};

export default withAuth(Dashboard); // Proteger la ruta con autenticación
