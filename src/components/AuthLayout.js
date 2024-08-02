import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/AuthLayout.css';
import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center auth-container">
            <Row className="w-100 text-center mb-5">
                <Col>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo.webp`} alt="Asociación Montessori de México" className="img-fluid mx-2 logo-image" />
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo-Kalpilli.webp`} alt="Kalpilli" className="img-fluid mx-2 d-none d-sm-inline logo-image" />
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo-SEM.webp`} alt="Sociedad de Escuelas Montessori" className="img-fluid mx-2 d-none d-sm-inline logo-image" />
                </Col>
            </Row>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow-lg p-4 bg-body-tertiary rounded">
                        <Card.Body>
                            {children}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthLayout;
