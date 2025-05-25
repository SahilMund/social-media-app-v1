import React from 'react'
import { Navigate } from 'react-router-dom'
import { getAuthToken } from '../helpers/localstorage'
import Navbar from '../components/Navbar'

const ProtectedRoute = ({ children, isPublic = false }) => {
    const token = getAuthToken()

    // Redirect unauthenticated users from private pages
    if (!token && !isPublic) {
        return <Navigate to="/login" replace />
    }

    // Redirect authenticated users away from public pages (like login/signup)
    if (token && isPublic) {
        return <Navigate to="/" replace />
    }

    // Render content (with Navbar for protected pages)
    return !isPublic ? (
        <div>
            <div className="top">
                <Navbar />
            </div>
            <div className="bottom">{children}</div>
        </div>
    ) : (
        children
    )
}

export default ProtectedRoute
