import React from 'react';
import { useSelector } from 'react-redux'; // Corrected import
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const { currentUser } = useSelector(state => state.user); // Corrected useSelector
    return (
        <>
            {currentUser ? <Outlet /> : <Navigate to="/sign-in" />}
        </>
    );
}

export default PrivateRoute;
