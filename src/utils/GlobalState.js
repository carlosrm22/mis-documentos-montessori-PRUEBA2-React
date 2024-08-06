import React, { createContext, useReducer, useContext, useMemo } from 'react';
// createContext: Crea un contexto para el estado global.
// useReducer: Hook para manejar el estado y las acciones de manera similar a Redux.
// useContext: Hook para consumir el contexto creado.
// useMemo: Hook para memorizar valores y evitar cálculos innecesarios.
import PropTypes from 'prop-types';
// PropTypes: Biblioteca para validar las propiedades que se pasan a los componentes.

const SET_FORM_DATA = 'SET_FORM_DATA'; // Para restablecer datos del formulario.
const SET_USER = 'SET_USER'; // Para restablecer el usuario.
const SET_LOADING = 'SET_LOADING'; // Para establecer el estado de carga.
const SET_ERROR = 'SET_ERROR'; // Para establecer un error.
// Constantes que representan los tipos de acciones que se pueden despachar.

const initialState = {
    formData: {},
    user: null,
    loading: false,
    error: null,
};
// Estado inicial del contexto global.

const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => null);
// Creación de los contextos para el estado y el despacho de acciones.

const globalReducer = (state, action) => {
    switch (action.type) {
        case SET_FORM_DATA:
            return { ...state, formData: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
// Reducer que maneja las acciones y actualiza el estado global en consecuencia.

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    const stateValue = useMemo(() => state, [state]);
    const dispatchValue = useMemo(() => dispatch, [dispatch]);

    return (
        <GlobalStateContext.Provider value={stateValue}>
            <GlobalDispatchContext.Provider value={dispatchValue}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};
// Componente proveedor que envuelve la aplicación y proporciona el estado y el despacho a través de contextos.

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
// Validación de propiedades para asegurar que 'children' es un nodo de React y es requerido.

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
// Hooks personalizados para consumir el estado y el despacho desde cualquier componente.