import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook for routing

function LoginForm() {
    // State for managing form data (username and password)
    const [formData, setFormData] = useState({ name: '', password: '' });

    // State for managing error messages
    const [error, setError] = useState('');

    // Navigation hook to redirect the user
    const navigate = useNavigate();

    // Function to handle input changes and update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); // Reset error message when the user starts typing
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Sending POST request to the login endpoint with the form data
            const response = await fetch('http://localhost:8088/login/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert formData to JSON
            });

            // Check if the response is successful (status 200-299)
            if (response.ok) {
                const token = await response.text(); // Get the token from response
                localStorage.setItem('token', token); // Save the token to localStorage
                console.log('Token saved:', token); // For debugging purposes

                alert('Login successful'); // Notify the user of successful login
                navigate('/dashboard'); // Redirect the user to the dashboard
            } else {
                // Handle different error scenarios based on the response status code
                const errorMessage = response.status === 403
                    ? 'Access forbidden. Check your credentials or permissions.'
                    : response.status === 404
                    ? 'Login endpoint not found. Please contact support.'
                    : await response.text(); // Read the error message from the response
                setError(errorMessage || 'Invalid username or password'); // Display the error message
            }
        } catch (error) {
            console.error('Error:', error); // Log the error for debugging
            setError('An error occurred. Please try again later.'); // Show a general error message
        }
    };

    return (
        <div>
            <main
                style={{
                    display: 'flex', // Flexbox layout to center the form
                    justifyContent: 'center', // Center the form horizontally
                    alignItems: 'center', // Center the form vertically
                    minHeight: '100vh', // Full viewport height
                    backgroundColor: '#f7f7f7', // Light gray background color
                }}
            >
                <div
                    style={{
                        backgroundColor: '#fff', // White background for the form container
                        maxWidth: '600px', // Maximum width for the form
                        width: '100%', // Full width up to the maxWidth
                        padding: '30px', // Padding around the form elements
                        borderRadius: '8px', // Rounded corners for the form container
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow around the form
                    }}
                >
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Form</h2>
                    <hr /> {/* Horizontal line separating the heading from the form */}
                    
                    {/* Form element */}
                    <form onSubmit={handleSubmit}>
                        {/* Username Input Field */}
                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="username"
                                style={{
                                    display: 'block', // Block-level label
                                    fontWeight: 'bold', // Bold font for the label
                                    fontSize: '16px', // Font size of the label
                                    marginBottom: '8px', // Space between label and input
                                    color: '#333', // Dark gray text color
                                }}
                            >
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="name" // Name matches the formData key
                                value={formData.name} // Controlled value from formData
                                onChange={handleInputChange} // Update state on input change
                                required // Make this field mandatory
                                autoComplete="username" // Suggest the username from browser
                                style={{
                                    width: '100%', // Full width of the input
                                    padding: '10px', // Padding inside the input box
                                    borderRadius: '4px', // Rounded corners
                                    border: '1px solid #ddd', // Light gray border
                                    fontSize: '16px', // Font size inside the input
                                }}
                            />
                        </div>

                        {/* Password Input Field */}
                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="password"
                                style={{
                                    display: 'block', // Block-level label
                                    fontWeight: 'bold', // Bold font for the label
                                    fontSize: '16px', // Font size of the label
                                    marginBottom: '8px', // Space between label and input
                                    color: '#333', // Dark gray text color
                                }}
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password" // Name matches the formData key
                                value={formData.password} // Controlled value from formData
                                onChange={handleInputChange} // Update state on input change
                                required // Make this field mandatory
                                autoComplete="current-password" // Suggest the password from browser
                                style={{
                                    width: '100%', // Full width of the input
                                    padding: '10px', // Padding inside the input box
                                    borderRadius: '4px', // Rounded corners
                                    border: '1px solid #ddd', // Light gray border
                                    fontSize: '16px', // Font size inside the input
                                }}
                            />
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div
                                style={{
                                    marginBottom: '20px',
                                    padding: '10px',
                                    backgroundColor: '#f8d7da', // Light red background
                                    color: '#721c24', // Dark red text color
                                    border: '1px solid #f5c6cb', // Red border for the error
                                    borderRadius: '4px', // Rounded corners for the error box
                                }}
                            >
                                {error} {/* Display the error message */}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                width: '100%', // Full width of the button
                                padding: '12px', // Padding inside the button
                                backgroundColor: '#04AA6D', // Green background color for the button
                                color: '#fff', // White text color
                                border: 'none', // No border
                                borderRadius: '4px', // Rounded corners
                                fontSize: '16px', // Font size for the button text
                                cursor: 'pointer', // Pointer cursor on hover
                            }}
                        >
                            Login
                        </button>
                    </form>

                    {/* Link to Register page */}
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <p>
                            Don't have an account?{' '}
                            <a
                                href="/register-form" // Link to the registration page
                                style={{ color: '#007bff', textDecoration: 'none' }} // Styled link
                            >
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginForm;
