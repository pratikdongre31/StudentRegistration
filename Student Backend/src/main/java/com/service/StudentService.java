package com.service;

import java.util.List;

import com.model.Login;
import com.model.Student;

public interface StudentService {
	
	void saveStudent(Student student);
	
	String deleteStudent(Long id);
	
	List<Student> getAllStudents();
	
	void updateStudent(Long id, Student student);
	
	Student getStudentById(Long id);
	
	String LoginSave(Login login);
	
	String validateUser(String username, String password);

}
