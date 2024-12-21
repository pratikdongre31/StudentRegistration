import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import the navigation hook for routing

const Dashboard = () => {
  const navigate = useNavigate(); // Navigation hook to redirect the user
  const [user, setUser] = useState({ name: '' }); // Simulated user state (replace with real authentication logic)

  // Function to handle logout
  const handleLogout = () => {
    // Simulate clearing the user session (for real applications, reset authentication states here)
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage to simulate logout
    alert('You have been logged out'); // Notify user of successful logout
    navigate('/'); // Redirect the user to the home page after logout
  };

  // Navigate to the "Add Student" page
  const handleAddStudent = () => {
    navigate('/add-student');
  };

  // Navigate to the "View Students" page
  const handleViewStudents = () => {
    navigate('/view-students');
  };

  // Navigate to the "List Students" page
  const handleListStudents = () => {
    navigate('/list-students');
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        background: '#f4f4f4',
        minHeight: '100vh', // Full viewport height
      }}
    >
      {/* Header Section */}
      <h1
        style={{
          color: '#333', // Dark text color
          textAlign: 'center', // Center align the heading
          marginBottom: '20px', // Margin at the bottom
        }}
      >
        Student Dashboard
      </h1>

      {/* User Welcome Section */}
      {user ? (
        // This section is shown when a user is logged in
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#e8f5e9', // Greenish background for welcome
            color: '#2e7d32', // Green color text
          }}
        >
          <p style={{ fontSize: '16px', margin: '0' }}>Welcome {user.name}</p>
        </div>
      ) : (
        // This section is shown when there is no logged-in user
        <p
          style={{
            textAlign: 'center', // Center the text
            color: '#555', // Dark gray text color
            marginBottom: '20px',
            fontSize: '16px',
          }}
        >
          Please log in to access the dashboard.
        </p>
      )}

      {/* Buttons Section */}
      <div
        style={{
          display: 'flex', // Flexbox layout for button alignment
          justifyContent: 'center', // Center the buttons
          gap: '10px', // Add spacing between buttons
          marginTop: '20px', // Margin to separate from previous sections
        }}
      >
        {/* Add Student Button */}
        <button
          onClick={handleAddStudent} // Navigate to Add Student page on click
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2', // Blue background color
            color: '#fff', // White text
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer', // Change cursor to pointer to indicate clickable
            transition: 'background-color 0.3s ease', // Smooth background color transition on hover
          }}
        >
          Add Student
        </button>
        
        {/* View Students Button */}
        <button
          onClick={handleViewStudents} // Navigate to View Students page on click
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2', // Blue background color
            color: '#fff', // White text
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Smooth background color transition on hover
          }}
        >
          View Students
        </button>

        {/* List Students Button */}
        <button
          onClick={handleListStudents} // Navigate to List Students page on click
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2', // Blue background color
            color: '#fff', // White text
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Smooth background color transition on hover
          }}
        >
          List Students
        </button>
      </div>

      {/* Logout Button Section */}
      <div
        style={{
          display: 'flex', // Flexbox for centering the logout button
          justifyContent: 'center', // Center the button
          marginTop: '30px', // Add margin at the top
        }}
      >
        <button
          onClick={handleLogout} // Trigger logout function on click
          style={{
            padding: '10px 20px',
            backgroundColor: '#d32f2f', // Red background for logout button
            color: '#fff', // White text
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer', // Pointer cursor on hover
            transition: 'background-color 0.3s ease', // Smooth background color transition on hover
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
