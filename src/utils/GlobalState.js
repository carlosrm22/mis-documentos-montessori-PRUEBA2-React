import React, { createContext, useReducer, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

// Definir constantes para las acciones
const SET_FORM_DATA = 'SET_FORM_DATA';
const SET_USER = 'SET_USER';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

const initialState = {
    formData: {},
    user: null,
    loading: false,
    error: null,
};

const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => null);

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

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Memoizar los valores de los contextos
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

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);