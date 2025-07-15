import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* eslint-disable no-unused-vars */
const withRoleProtection = (allowedRoles) => (Component) => {
    return (props) => {
        const { user } = useAuth();

        if (!allowedRoles.includes(user?.role)) {
            return <Navigate to='/un-authorized' />
        }

        return <Component {...props} />
    }
}

export default withRoleProtection
