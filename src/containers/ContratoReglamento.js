import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';
import { cargarDatosIniciales } from '../utils/dataUtils';
import useAuth from '../utils/useAuth';
import useLoading from '../utils/useLoading';
import { useNavigate } from 'react-router-dom';
import withAuth from '../hoc/withAuth';

const ContratoReglamento = () => {
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const setLoading = useLoading();
    const { user, authLoading } = useAuth();
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (!formData) {
                const data = await cargarDatosIniciales(dispatch);
                dispatch({ type: 'SET_FORM_DATA', payload: data });
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
            dispatch({ type: 'SET_FORM_DATA', payload: { error } });
        } finally {
            setLoading(false);
        }
    }, [dispatch, formData, setLoading]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [fetchData, user, authLoading, navigate]);

    if (!formData || formData.error) {
        return <div>Cargando datos...</div>;
    }

    const { nombresResponsable, apellidosResponsable, nivelEducativo } = formData;

    return (
        <Container className="mt-5 bg-white border shadow-lg p-4 bg-body-tertiary rounded">
            <Row>
                <Col>
                    <h1 className="text-center p-4">CONTRATO DE PRESTACIÓN DE SERVICIOS EDUCATIVOS</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="text-end">CICLO ESCOLAR 2021-2022</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 className="text-end p-4">NIVEL EDUCATIVO {nivelEducativo}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        CONTRATO DE PRESTACIÓN DE SERVICIOS EDUCATIVOS QUE CELEBRAN POR UNA PARTE LA ASOCIACIÓN
                        MONTESSORI DE MÉXICO A.C. Y A QUIEN EN LO SUCESIVO SE LE DENOMINARA “EL PRESTADOR” CON DOMICILIO
                        EN AVENIDA 2 NO. 48 COLONIA SAN PEDRO DE LOS PINOS, C.P. 03800, BENITO JUÁREZ, CDMX, REPRESENTADO
                        POR CARIDAD ROXANA ROMERO MUÑOZ QUIEN TIENE EL CARÁCTER DE REPRESENTANTE LEGAL Y POR
                        LA OTRA <b>{nombresResponsable} {apellidosResponsable}</b> A QUIEN EN LO SUCESIVO
                        SE LE DENOMINARA PARA LOS EFECTOS DE ESTE CONTRATO COMO “EL PRESTATARIO” INCLUYENDO ESTE
                        CONCEPTO A AMBOS PADRES DE FAMILIA, DE ACUERDO CON LAS SIGUIENTES DECLARACIONES Y CLAUSULAS:
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default withAuth(React.memo(ContratoReglamento));
