import React from 'react';
import { useGlobalState } from '../utils/GlobalState';

/**
 * Componente para la sección de Contrato y Reglamento.
 */
const ContratoReglamento = () => {
    const { formData } = useGlobalState();

    if (!formData || !formData.nombresResponsable) {
        return <div>Cargando datos...</div>;
    }

    const { nombresResponsable, apellidosResponsable } = formData;

    return (
        <div className="container mt-5">
            <h1 className="text-center p-4">CONTRATO DE PRESTACIÓN DE SERVICIOS EDUCATIVOS</h1>
            <h2 className="text-end">CICLO ESCOLAR 2021-2022</h2>
            <h3 className="text-end p-4">NIVEL EDUCATIVO {formData.nivelEducativo}</h3>
            <p>
                CONTRATO DE PRESTACIÓN DE SERVICIOS EDUCATIVOS QUE CELEBRAN POR UNA PARTE LA ASOCIACIÓN
                MONTESSORI DE MÉXICO A.C. Y A QUIEN EN LO SUCESIVO SE LE DENOMINARA “EL PRESTADOR” CON DOMICILIO
                EN AVENIDA 2 NO. 48 COLONIA SAN PEDRO DE LOS PINOS, C.P. 03800, BENITO JUÁREZ, CDMX, REPRESENTADO
                POR CARIDAD ROXANA ROMERO MUÑOZ QUIEN TIENE EL CARÁCTER DE REPRESENTANTE LEGAL Y POR
                LA OTRA <b>{nombresResponsable} {apellidosResponsable}</b> A QUIEN EN LO SUCESIVO
                SE LE DENOMINARA PARA LOS EFECTOS DE ESTE CONTRATO COMO “EL PRESTATARIO” INCLUYENDO ESTE
                CONCEPTO A AMBOS PADRES DE FAMILIA, DE ACUERDO CON LAS SIGUIENTES DECLARACIONES Y CLAUSULAS:
            </p>
        </div>
    );
};

export default ContratoReglamento;
