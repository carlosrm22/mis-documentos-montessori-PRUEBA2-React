// src/utils/GlobalState.js
import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

// Estado inicial de la aplicación
const initialState = {
    formData: {},
    user: null,
    loading: false,
};

// Creación de los contextos de estado y despacho
const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => null);

// Reductor global para manejar las acciones
const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

// Proveedor global para envolver la aplicación
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hooks para usar el estado y el despacho globales
export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
