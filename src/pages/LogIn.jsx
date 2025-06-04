import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { userLogin } from '../service/auth';
import { saveToLocalStorage } from '../helpers/localstorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles/Login.css';

const LogIn = () => {
    const initialFormValues = { email: "", password: "" };
    const [loginForm, setLoginForm] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const validateField = (name, value) => {
        let message = '';
        if (!value) {
            message = 'This field is required';
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                message = 'Please enter a valid email address';
            }
        }
        setErrors(prev => ({ ...prev, [name]: message }));
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasErrors = Object.values(loginForm).some(v => !v);
        Object.entries(loginForm).forEach(([key, value]) => validateField(key, value));
        if (hasErrors) {
            toast.error("Please fill all the required details");
            return;
        }

        try {
            setIsLoading(true);
            const response = await userLogin(loginForm);
            if (!response?.data?.success) {
                toast.error(response?.data?.message);
                return;
            }

            toast.success(response?.data?.message);
            setLoginForm(initialFormValues);
            saveToLocalStorage(response?.data?.data?.token);
            setUser({
                name: response?.data?.data?.name,
                email: response?.data?.data?.email,
                userId: response?.data?.data?._id
            });
            navigate('/', { replace: true });
        } catch (error) {
            toast.error("Something went wrong");
            console.log('error', error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>LogIn</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label>Email</label>
                <input
                    className={errors.email ? 'input-error' : ''}
                    placeholder='Enter your email'
                    value={loginForm.email}
                    type='email'
                    name="email"
                    onChange={handleOnChange}
                />
                {errors.email && <div className="error-msg">{errors.email}</div>}

                <label>Password</label>
                <div className="password-wrapper">
                    <input
                        className={errors.password ? 'input-error' : ''}
                        placeholder='Enter your password'
                        value={loginForm.password}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleOnChange}
                    />
                    <span className="toggle-icon" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                {errors.password && <div className="error-msg">{errors.password}</div>}

                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Login'}
                </button>
            </form>

            <div className="signup-redirect">
                Don’t have an account?
                <a href="/signup">Sign up</a>
            </div>
        </div>
    );
};

export default LogIn;
