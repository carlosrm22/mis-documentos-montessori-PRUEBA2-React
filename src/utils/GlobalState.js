// src/utils/GlobalState.js
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    user: null,
    formData: {
        apellidosAlumno: '',
        nombresAlumno: '',
        fechaNacimientoAlumno: '',
        edadAlumno: '',
        curpAlumno: '',
        apellidosResponsable: '',
        nombresResponsable: '',
        telefonoContacto: '',
        emailContacto: '',
        lugarNacimientoAlumno: '',
        nombresMadre: '',
        apellidosMadre: '',
        nombresPadre: '',
        apellidosPadre: '',
        domicilioPadres: '',
        nivelEducativo: ''
    }
};

const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => { });

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        default:
            return state;
    }
};

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
