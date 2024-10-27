import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SimpleProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    // Check if the user arrived from the forgot password route
    const fromForgotPassword = location.state?.fromForgotPassword;

    if (!fromForgotPassword) {
        // If accessed directly, redirect to forgot password page
        return <Navigate to="/forgotpass" replace />;
    }

    return children;
};

export default SimpleProtectedRoute;
