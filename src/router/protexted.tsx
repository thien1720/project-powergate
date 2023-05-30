import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constants';

interface ProtectedRouteProps {
    children ?: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = Cookies.get(ACCESS_TOKEN_KEY);

    if (auth) {
        return children;
    }

    return <Navigate to="/auth/sign-in" replace />;
};

export default ProtectedRoute