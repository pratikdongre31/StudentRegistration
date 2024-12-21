import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';
import ListStudents from './components/ListStudents';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register-form" element={<RegisterForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/view-students" element={<ViewStudents />} />
                <Route path="/list-students" element={<ListStudents />} />
                <Route path="/update-student/:id" element={<UpdateStudent />} />
            </Routes>
    </Router>
  );
}

export default App;