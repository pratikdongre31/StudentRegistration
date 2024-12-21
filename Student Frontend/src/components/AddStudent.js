import React, { useState } from 'react';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const AddStudent = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        education: '',
        gender: '',
        bloodGrp: '',
        collegeName: '',
        address: ''
    });

    // Predefined options for education and blood group
    const [educationOptions] = useState([
        'BCA',
        'BSc',
        'BE',
        'BTech',
        'MCA',
        'MSc',
        'MTech'
    ]);

    const [bloodGroupOptions] = useState([
        'A positive',
        'A negative',
        'B positive',
        'B negative',
        'O positive',
        'O negative',
        'AB positive',
        'AB negative'
    ]);

    // Navigation hook to redirect the user
    const navigate = useNavigate();

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data to submit as FormData
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('mobile', formData.mobile);
        formDataToSubmit.append('education', formData.education);
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('bloodGrp', formData.bloodGrp);
        formDataToSubmit.append('collegeName', formData.collegeName);
        formDataToSubmit.append('address', formData.address);

        try {
            // Make a POST request to register the student
            await apiClient.post(`/students/registerStudent`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Reset the form fields after successful submission
            setFormData({
                fullName: '',
                email: '',
                mobile: '',
                education: '',
                gender: '',
                bloodGrp: '',
                collegeName: '',
                address: ''       
            });

            // Notify user of success
            alert('Student registered successfully!');
            
        } catch (error) {
            // Handle error in case of failure
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    // Handle navigation to dashboard
    const handleGoBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="form-container">
            {/* Header section with Go Back button */}
            <div className="d-flex justify-content-start align-items-center mb-4">
                <button 
                    className="btn btn-primary d-flex justify-content-center align-items-center" 
                    onClick={handleGoBack}
                    style={{ width: '30px' }}
                >
                    ‹‹
                </button>
                <h2 className="mx-auto">Student Registration Form</h2>
            </div>

            {/* Form to capture student details */}
            <form onSubmit={handleSubmit}>
                {/* Full Name Input */}
                <div className="form-group form-row">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="form-group form-row">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Mobile Input */}
                <div className="form-group form-row">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Education Dropdown */}
                <div className="form-group form-row">
                    <label htmlFor="education">Education</label>
                    <select
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Education</option>
                        {educationOptions.map((edu, index) => (
                            <option key={index} value={edu}>
                                {edu}
                            </option>
                        ))}
                    </select>
                </div>

                {/* College Name Input */}
                <div className="form-group form-row">
                    <label htmlFor="collegeName">College Name</label>
                    <input
                        type="text"
                        id="collegeName"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Gender Selection */}
                <div className="form-group form-row">
                    <label>Gender</label>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            checked={formData.gender === 'other'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="other">Other</label>
                    </div>
                </div>

                {/* Blood Group Dropdown */}
                <div className="form-group form-row">
                    <label htmlFor="bloodGrp">Blood Group</label>
                    <select
                        id="bloodGrp"
                        name="bloodGrp"
                        value={formData.bloodGrp}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroupOptions.map((group, index) => (
                            <option key={index} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Address Input */}
                <div className="form-group form-row">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success" style={{ width: '250px' }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
