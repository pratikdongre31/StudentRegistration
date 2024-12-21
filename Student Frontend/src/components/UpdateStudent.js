import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for routing and navigation
import apiClient from '../utils/apiClient'; // Import the API client for making API requests

const UpdateStudent = () => {
    const { id } = useParams(); // Get student ID from route params
    const navigate = useNavigate(); // Navigation hook to redirect the user

    // State to store the form data
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

    // Static data for dropdown options (education and blood group)
    const [educationOptions] = useState([
        'BCA', 'BSc', 'BE', 'BTech', 'MCA', 'MSc', 'MTech'
    ]);

    const [bloodGroupOptions] = useState([
        'A positive', 'A negative', 'B positive', 'B negative',
        'O positive', 'O negative', 'AB positive', 'AB negative'
    ]);

    // Fetch existing student data when the component mounts
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                // Make an API call to fetch the student data by ID
                const response = await apiClient.get(`/students/getStudentById/${id}`);
                // Set the fetched data into the state
                setFormData({
                    fullName: response.data.fullName || '',
                    email: response.data.email || '',
                    mobile: response.data.mobile || '',
                    education: response.data.education || '',
                    gender: response.data.gender || '',
                    bloodGrp: response.data.bloodGrp || '',
                    collegeName: response.data.collegeName || '',
                    address: response.data.address || ''
                });
            } catch (error) {
                console.error('Error fetching student data:', error);
                alert('Error fetching student data.');
            }
        };

        fetchStudentData(); // Call the function to fetch student data
    }, [id]); // Dependency array ensures this effect runs only when the 'id' changes

    // Handle form field changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the specific field in the form data
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission to update student data
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const formDataToSubmit = new FormData();
        // Append form data to FormData object for sending via API
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('mobile', formData.mobile);
        formDataToSubmit.append('education', formData.education);
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('bloodGrp', formData.bloodGrp);
        formDataToSubmit.append('collegeName', formData.collegeName);
        formDataToSubmit.append('address', formData.address);

        try {
            // Make an API call to update the student information by ID
            await apiClient.put(`/students/update/student/${id}`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type for form data
                }
            });

            alert('Student data updated successfully!'); // Notify the user of success
            navigate('/list-students'); // Navigate to the list of students after successful update
        } catch (error) {
            console.error('Error updating student:', error);
            alert('An error occurred. Please try again later.'); // Handle error
        }
    };

    // Handle navigation to list students page
    const handleGoBack = () => {
        navigate('/list-students');
    };

    return (
        <div className="form-container">
            {/* Header and back button */}
            <div className="d-flex justify-content-start align-items-center mb-4">
                <button 
                    className="btn btn-primary d-flex justify-content-center align-items-center" 
                    onClick={handleGoBack}
                    style={{ width: '30px' }} // Back button style
                >
                    ‹‹
                </button>
                <h2 className="mx-auto">Update Student Information</h2> {/* Heading */}
            </div>

            {/* Form to update student information */}
            <form onSubmit={handleSubmit}>
                {/* Full Name Field */}
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

                {/* Email Field */}
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

                {/* Mobile Field */}
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

                {/* College Name Field */}
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

                {/* Address Field */}
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
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    );
};

export default UpdateStudent;
