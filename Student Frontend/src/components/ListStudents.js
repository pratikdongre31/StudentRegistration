import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const ListStudents = () => {
    const [students, setStudents] = useState([]); // Stores all students data
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page for pagination
    const [totalPages, setTotalPages] = useState(1); // Total number of pages for pagination
    const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering
    const [editingField, setEditingField] = useState(null); // Tracking field currently being edited
    const navigate = useNavigate(); // Navigation hook to redirect the user

    // Fetch all students when component is mounted
    useEffect(() => {
        fetchStudents();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Fetch students data from API
    const fetchStudents = async () => {
        try {
            const response = await apiClient.get('/students/getAllStudents');
            setStudents(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Filter students based on search query
    const filteredStudents = students.filter((student) => {
        return (
            student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.education.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Update total pages when filteredStudents or itemsPerPage changes
    useEffect(() => {
        setTotalPages(Math.ceil(filteredStudents.length / itemsPerPage));
    }, [filteredStudents, itemsPerPage]);

    // Get the students to display on the current page
    const currentStudents = filteredStudents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle navigation back to the dashboard
    const handleGoBack = () => {
        navigate('/dashboard');
    };

    // Navigate to student update page
    const handleUpdate = (id) => {
        navigate(`/update-student/${id}`);
    };

    // Handle student deletion
    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/students/delete/student/${id}`);
            setStudents(students.filter((student) => student.id !== id)); // Remove deleted student from state
            alert('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Failed to delete student. Please try again later.');
        }
    };

    // Handle page change in pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = Number(event.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    // Handle in-place editing of a field
    const handleFieldEdit = (studentId, field, value) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId ? { ...student, [field]: value } : student
            )
        );
    };

    // Save the edited field value
    const handleSave = async (studentId, field, value) => {
        try {
            const updatedStudent = { ...students.find((stu) => stu.id === studentId), [field]: value };
            await apiClient.put(`/students/update/student/${studentId}`, updatedStudent, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === studentId ? { ...student, [field]: value } : student
                )
            );
            alert('Student updated successfully!');
        } catch (error) {
            console.error('Error updating field:', error);
            alert('Failed to update student. Please try again.');
        } finally {
            setEditingField(null); // Exit edit mode after save
        }
    };

    // Enable editing for a field
    const handleFieldClick = (studentId, field) => {
        setEditingField({ studentId, field });
    };

    // Handle dropdown change (e.g., gender or blood group)
    const handleDropdownChange = (studentId, field, value) => {
        handleFieldEdit(studentId, field, value); // Update the field value in state
        handleSave(studentId, field, value); // Save the change immediately
        setEditingField(null); // Exit edit mode after save
    };

    // Pagination: Show only a limited number of pages
    const pageLimit = 3;
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);
    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="container mt-4" style={{ maxWidth: '1200px' }}>
            <h2 className="mb-4">Students Data</h2>

            {/* Search and navigation buttons */}
            <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-primary" onClick={handleGoBack} style={{ width: '150px' }}>
                    Go To Dashboard
                </button>
                <div className="d-flex">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search... Name, Education, Address"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: '400px', marginLeft: '10px' }}
                    />
                </div>
            </div>

            {/* Students Table */}
            <table className="table table-bordered" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Education</th>
                        <th>College Name</th>
                        <th>Gender</th>
                        <th>Blood Group</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student, index) => (
                        <tr key={student.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                            {/* Editable Fields */}
                            {['fullName', 'email', 'mobile', 'education', 'collegeName'].map(field => (
                                <td key={field} className="position-relative">
                                    <div className="d-flex justify-content-between align-items-center">
                                        {editingField?.studentId === student.id && editingField?.field === field ? (
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="text"
                                                    value={student[field]}
                                                    className="form-control"
                                                    onChange={(e) => handleFieldEdit(student.id, field, e.target.value)}
                                                    autoFocus
                                                />
                                            </div>
                                        ) : (
                                            <span onClick={() => handleFieldClick(student.id, field)}>{student[field]}</span>
                                        )}
                                    </div>

                                    {editingField?.studentId === student.id && editingField?.field === field && (
                                        <div className="mt-2">
                                            <button
                                                className="btn btn-success text-white"
                                                onClick={() => handleSave(student.id, field, student[field])}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </td>
                            ))}

                            {/* Gender Dropdown */}
                            <td>
                                {editingField?.studentId === student.id && editingField?.field === 'gender' ? (
                                    <select
                                        value={student.gender}
                                        onChange={(e) => handleDropdownChange(student.id, 'gender', e.target.value)}
                                        className="form-select"
                                    >
                                        {['Male', 'Female', 'Other'].map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span onClick={() => handleFieldClick(student.id, 'gender')}>{student.gender}</span>
                                )}
                            </td>

                            {/* Blood Group Dropdown */}
                            <td>
                                {editingField?.studentId === student.id && editingField?.field === 'bloodGrp' ? (
                                    <select
                                        value={student.bloodGrp}
                                        onChange={(e) => handleDropdownChange(student.id, 'bloodGrp', e.target.value)}
                                        className="form-select"
                                    >
                                        {[
                                            'A positive', 'A negative', 'B positive', 'B negative',
                                            'O positive', 'O negative', 'AB positive', 'AB negative'
                                        ].map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span onClick={() => handleFieldClick(student.id, 'bloodGrp')}>{student.bloodGrp}</span>
                                )}
                            </td>

                            <td>{student.address}</td>

                            {/* Actions */}
                            <td>
                                <div className="d-flex justify-content-start">
                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => handleUpdate(student.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <label className="mr-2">Records per page:</label>
                        <select
                            className="form-select d-inline w-auto"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            {[5, 10, 15, 20, 25, 30].map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Page numbers */}
                    <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                style={{
                                    padding: '0.5rem 0.5rem',
                                    minWidth: '55px',
                                    textAlign: 'center',
                                    margin: '0 3px',
                                }}
                            >
                                Prev
                            </button>
                        </li>

                        {visiblePages.map(page => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        padding: '0.5rem 0.5rem',
                                        minWidth: '30px',
                                        textAlign: 'center',
                                        margin: '0 3px',
                                    }}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                style={{
                                    padding: '0.5rem 0.5rem',
                                    minWidth: '55px',
                                    textAlign: 'center',
                                    margin: '0 3px',
                                }}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default ListStudents;
