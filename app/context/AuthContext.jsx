import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in the user
    const login = (userData) => {
        setUser(userData);
    };

    // Function to log out the user
    const logout = () => {
        setUser(null);
    };

    // Provide the authentication data and methods to the children components
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
