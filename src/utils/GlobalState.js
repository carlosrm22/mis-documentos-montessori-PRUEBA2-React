import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    formData: {},
    user: null,
    loading: false,
};

const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => null);

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

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
