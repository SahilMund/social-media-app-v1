import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../service/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
    const navbarItems = [
        { label: 'Home', path: '/' },
        { label: 'Create Post', path: '/create-post' },
        { label: 'My Posts', path: '/my-posts' },
        { label: 'Profile', path: '/user-profile' },
    ];

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {

        if (!user) {
            toast.error("Something went wrong!!");
            return;
        }

        try {
            const response = await userLogout();
            if (!response?.data?.success) {
                toast.error(response?.data?.message);
                return;
            }

            toast.success(response?.data?.message);
            setUser(null);
            localStorage.clear();
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            toast.error("Something went wrong");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                {navbarItems.map((nav) => (
                    <NavLink
                        key={nav.path}
                        to={nav.path}
                        className={({ isActive }) =>
                            isActive ? 'nav-item active' : 'nav-item'
                        }
                    >
                        {nav.label}
                    </NavLink>
                ))}
            </div>

            {user && (
                <div className="nav-right">
                    <span className="username">Hi, {user?.name}</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
