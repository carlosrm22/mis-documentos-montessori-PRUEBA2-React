// src/components/Bienvenida.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import Swal from 'sweetalert2';

const Bienvenida = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: error.message
            });
        }
    };

    return (
        <Container className="shadow-lg p-4 mb-5 bg-body-tertiary rounded">
            <Row className="text-center mb-4">
                <Col>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo-No-Text.webp`} alt="Logo" className="w-25 mb-3" />
                    <h1>Bienvenido a <br></br>Mi Cuenta Montessori</h1>
                    <p className="fs-5 fw-light">Gestione sus documentos y datos fácilmente</p>
                </Col>
            </Row>
            <Row className="justify-content-center mb-5">
                <Col md={6} lg={4}>
                    <Form onSubmit={handleLogin} className="text-start">
                        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar Sesión
                        </Button>
                    </Form>
                    <Link to="/register" className="btn btn-secondary w-100 mt-3">Registrarse</Link>
                </Col>
            </Row>
            <Row className="text-center mb-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <a className="icon-link icon-link-hover" href="https://kalpilli.com" target="_blank" rel="noopener noreferrer">
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
                                <a className="icon-link icon-link-hover" href="https://certificacionmontessori.com" target="_blank" rel="noopener noreferrer">
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
                                <a className="icon-link icon-link-hover" href="https://montessorimexico.org" target="_blank" rel="noopener noreferrer">
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
