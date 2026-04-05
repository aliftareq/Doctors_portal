import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
    //context value
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    //location
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;