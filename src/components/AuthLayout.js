// src/components/AuthLayout.js
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AuthLayout = ({ children }) => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <Row className="w-100 text-center mb-5">
                <Col>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo.webp`} alt="Asociación Montessori de México" className="img-fluid mx-2" style={{ maxHeight: '100px' }} />
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo-Kalpilli.webp`} alt="Kalpilli" className="img-fluid mx-2 d-none d-sm-inline" style={{ maxHeight: '100px' }} />
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo-SEM.webp`} alt="Sociedad de Escuelas Montessori" className="img-fluid mx-2 d-none d-sm-inline" style={{ maxHeight: '100px' }} />
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
