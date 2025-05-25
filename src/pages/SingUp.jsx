import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { userSignUp } from '../service/auth';
import { saveToLocalStorage } from '../helpers/localstorage';
import { useAuth } from '../context/AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles/signup.css';

const SingUp = () => {
    const initialFormValues = {
        name: "",
        email: "",
        password: ""
    };

    const [signupForm, setSignupForm] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
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
        } else if (name === 'password' && value.length < 6) {
            message = 'Password must be at least 6 characters';
        }
        setErrors(prev => ({ ...prev, [name]: message }));
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSignupForm(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        Object.entries(signupForm).forEach(([key, value]) => validateField(key, value));
        const hasErrors = Object.values(signupForm).some(val => !val);
        if (hasErrors) {
            toast.error("Please fill all the required details");
            return;
        }

        try {
            const response = await userSignUp(signupForm);
            if (!response?.data?.success) {
                toast.error(response?.data?.message);
                return;
            }

            toast.success(response?.data?.message);
            setSignupForm(initialFormValues);
            console.log('response?.data', response?.data)
            setUser({
                name: response?.data?.data?.name,
                email: response?.data?.data?.email
            });
            saveToLocalStorage(response?.data?.data?.token);

        } catch (error) {
            console.error('error', error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit} className="signup-form">
                <label>Name</label>
                <input
                    name="name"
                    value={signupForm.name}
                    placeholder='Enter your name'
                    type='text'
                    onChange={handleOnChange}
                    className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <div className="error-msg">{errors.name}</div>}

                <label>Email</label>
                <input
                    placeholder='Enter your email'
                    value={signupForm.email}
                    type='email'
                    name="email"
                    onChange={handleOnChange}
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <div className="error-msg">{errors.email}</div>}

                <label>Password</label>
                <div className="password-wrapper">
                    <input
                        placeholder='Enter your password'
                        value={signupForm.password}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleOnChange}
                        className={errors.password ? 'input-error' : ''}
                    />
                    <span className="toggle-icon" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                {errors.password && <div className="error-msg">{errors.password}</div>}

                <button type='submit'>Sign Up</button>
            </form>

            <div className="signup-redirect">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    );
};

export default SingUp;
