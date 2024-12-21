import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {
    const [students, setStudents] = useState([]);

    // Navigation hook to redirect the user
    const navigate = useNavigate();

    // Fetch students data when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make an API call to get the students data
                const response = await apiClient.get(`/students/getAllStudents`);
                setStudents(response.data); // Set the students data to state
            } catch (error) {
                console.error('Error fetching users:', error); // Log error if the API call fails
            }
        };

        fetchData(); // Trigger the fetchData function
    }, []); // Empty dependency array ensures this only runs once when the component mounts

    // Handle navigation to the dashboard page
    const handleGoBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="container mt-4">
            {/* Heading Section */}
            <h2 className="mb-4">Students Data</h2>

            {/* Button to go back to the dashboard */}
            <button 
                className="btn btn-primary mb-4" 
                onClick={handleGoBack}
                style={{ width: '150px' }}
            >
                Go To Dashboard
            </button>

            {/* Students Data Grid */}
            <div className="row">
                {students.map((student) => (
                    // Displaying each student card inside a grid column
                    <div className="col-md-4 mb-4" key={student.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                {/* Student's full name displayed as the card title */}
                                <h5 className="card-title mt-2">{student.fullName}</h5>

                                {/* Student's details in the card text */}
                                <p className="card-text">
                                    <strong>Email:</strong> {student.email}
                                    <br />
                                    <strong>Mobile:</strong> {student.mobile}
                                    <br />
                                    <strong>Education:</strong> {student.education}
                                    <br />
                                    <strong>College Name:</strong> {student.collegeName}
                                    <br />
                                    <strong>Gender:</strong> {student.gender}
                                    <br />
                                    <strong>Blood Group:</strong> {student.bloodGrp}
                                    <br />
                                    <strong>Address:</strong> {student.address}
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewStudents;
