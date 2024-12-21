import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); // Clear error when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password length
        if (formData.password.length < 5) {
            setError('Password must be at least 5 characters long.');
            return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        try {
            // Send data to API
            const response = await fetch('http://localhost:8088/login/loginsave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                alert('Registration successful!');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
                navigate('/');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container d-flex flex-grow-1 justify-content-center align-items-center py-4">
                <div 
                    className="card shadow rounded p-5" 
                    style={{
                        maxWidth: '600px', 
                        width: '100%', 
                        border: '1px solid #ccc', 
                        backgroundColor: 'lightblue', 
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px'
                    }}
                >
                    <h2 
                        className="text-center mb-4" 
                        style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}
                    >
                        Registration Form
                    </h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label 
                                htmlFor="name" 
                                className="form-label fw-bold" 
                                style={{ fontSize: '16px', color: '#444' }}
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                style={{
                                    padding: '12px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    marginBottom: '15px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label 
                                htmlFor="email" 
                                className="form-label fw-bold" 
                                style={{ fontSize: '16px', color: '#444' }}
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                style={{
                                    padding: '12px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    marginBottom: '15px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label 
                                htmlFor="password" 
                                className="form-label fw-bold" 
                                style={{ fontSize: '16px', color: '#444' }}
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                style={{
                                    padding: '12px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    marginBottom: '15px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label 
                                htmlFor="confirmPassword" 
                                className="form-label fw-bold" 
                                style={{ fontSize: '16px', color: '#444' }}
                            >
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                style={{
                                    padding: '12px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    marginBottom: '15px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        {error && 
                            <div 
                                className="alert alert-danger" 
                                style={{
                                    color: '#d9534f',
                                    backgroundColor: '#f2dede',
                                    borderColor: '#ebccd1',
                                    padding: '10px',
                                    borderRadius: '4px'
                                }}
                            >
                                {error}
                            </div>
                        }
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100" 
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '12px 20px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                marginTop: '20px'
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RegisterForm;
