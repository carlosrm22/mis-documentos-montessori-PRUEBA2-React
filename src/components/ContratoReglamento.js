// src/components/ContratoReglamento.js

import React from 'react';

const ContratoReglamento = ({ formData, nivelEducativo }) => {
    const { nombresResponsable, apellidosResponsable } = formData;

    return (
        <div className="container mt-5">
            <h1 className="text-center">CONTRATO DE PRESTACIÓN DE SERVICIOS EDUCATIVOS</h1>
            <p>CICLO ESCOLAR 2021-2022</p>
            <p>NIVEL EDUCATIVO {nivelEducativo}</p>
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