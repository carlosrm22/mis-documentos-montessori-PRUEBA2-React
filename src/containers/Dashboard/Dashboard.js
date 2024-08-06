import React from 'react';
import { useGlobalState } from '../../utils/GlobalState.js';
import useInitialData from '../../utils/useInitialData';
import withAuth from '../../hoc/withAuth';

const Dashboard = React.memo(() => {
    const { formData } = useGlobalState();
    const { loading, error } = useInitialData();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    if (!formData) {
        console.log("No se encontraron datos iniciales");
        return <div>No se encontraron datos iniciales</div>;
    }

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>Hola, {formData.nombresAlumno}</p> {/* Muestra un ejemplo de datos cargados */}
        </div>
    );
});

export default withAuth(Dashboard);
