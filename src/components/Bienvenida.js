// src/components/Bienvenida.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Bienvenida = () => {
    return (
        <Container className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <Row className="text-center mb-4">
                <Col>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/logoSombra.png`} alt="Logo" className="w-50" />
                    <p className="h1">Bienvenido a</p> <h1>Mi Cuenta Montessori</h1>
                    <p className="fs-5 fw-light">Gestione sus documentos y datos fácilmente</p>
                </Col>
            </Row>
            <Row className="text-center mb-5">
                <Col>
                    <Link to="/login">
                        <Button variant="primary" size="lg" className="me-3">Iniciar Sesión</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="secondary" size="lg">Registrarse</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="text-center mb-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <a className="icon-link icon-link-hover" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' }} href="https://kalpilli.com" target="_blank" rel="noopener noreferrer">
                                    Kalpilli
                                </a>
                            </Card.Title>
                            <Card.Text>
                                Fundada en 1965 es la primera escuela Montessori en México.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <a className="icon-link icon-link-hover" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' }} href="https://certificacionmontessori.com" target="_blank" rel="noopener noreferrer">
                                    Certificación Montessori
                                </a>
                            </Card.Title>
                            <Card.Text>
                                Formación profesional de Guías Montessori mediante Certificación Internacional.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <a className="icon-link icon-link-hover" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' }} href="https://montessorimexico.org" target="_blank" rel="noopener noreferrer">
                                    Montessori Mexico ORG
                                </a>
                            </Card.Title>
                            <Card.Text>
                                Conoce el trabajo de la Asociación Montessori para difundir el método Montessori.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Bienvenida;
