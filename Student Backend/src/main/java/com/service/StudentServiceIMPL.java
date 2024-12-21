package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.model.Login;
import com.model.Student;
import com.repository.LoginRepo;
import com.repository.StudentRepo;

@Service
public class StudentServiceIMPL implements StudentService {
	
	private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentServiceIMPL(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
	
	@Autowired
	private StudentRepo studRepo;
	
	@Autowired
	private LoginRepo loginRepo;
	
	// Save student
	@Override
	@Transactional
	public void saveStudent(Student student) {
		studRepo.save(student);
	}
	
	// Delete student
	@Override
	@Transactional
	public String deleteStudent(Long id) {
		Optional<Student> existingUserOptional = studRepo.findById(id);

        if (existingUserOptional.isPresent()) {
        	studRepo.deleteById(id);
            return "User deleted successfully!";
        } else {
            throw new IllegalArgumentException("User not found.");
        }
	}
	
	// Get all students
	@Override
	public List<Student> getAllStudents() {
		return studRepo.findAll();
	}
	
	// Update student
	@Override
	@Transactional
	public void updateStudent(Long id, Student student) {
		// TODO Auto-generated method stub
		
		Optional<Student> existingStudentOpt = studRepo.findById(id);
		if (existingStudentOpt.isPresent()) {
			Student existingStudent = existingStudentOpt.get();
			
			existingStudent.setFullName(student.getFullName());
			existingStudent.setMobile(student.getMobile());
			existingStudent.setEmail(student.getEmail());
			existingStudent.setEducation(student.getEducation());
			existingStudent.setGender(student.getGender());
			existingStudent.setBloodGrp(student.getBloodGrp());
			existingStudent.setCollegeName(student.getCollegeName());
			existingStudent.setAddress(student.getAddress());
			
			studRepo.save(existingStudent);
		} else {
			throw new RuntimeException("User not found.");
		}
		
	}
	
	// Get student by id
	@Override
	public Student getStudentById(Long id) {
		Optional<Student> userOptional = studRepo.findById(id);
        return userOptional.orElse(null);
	}
	
	
	@Override
	public String LoginSave(Login login) {
		
		System.out.println("landed on service method ");
	    if (login == null || login.getPassword() == null) {
	        System.out.println("login object or password is null");
	    }
	    login.setPassword(passwordEncoder.encode(login.getPassword()));
	    loginRepo.save(login); 
	    return "successful";
	}
	
	
	@Override
	public String validateUser(String username, String password) {
	  
	    Optional<Login> userOpt = loginRepo.findByName(username);
	    
	    if (!userOpt.isPresent()) {
	        System.out.println("User not found with username: " + username);
	        return "Invalid username or password";
	    }

	   
	    Login user = userOpt.get();
	    System.out.println("Fetched user from database: " + user);

	   
	    boolean isPasswordMatch = passwordEncoder.matches(password, user.getPassword());
	    System.out.println("Debug: Password provided: " + password);
	    System.out.println("Debug: Hashed password from DB: " + user.getPassword());
	    System.out.println("Debug: Password match status: " + isPasswordMatch);

	    if (isPasswordMatch) {
	        return "success";
	    } else {
	        return "Invalid username or password";
	    }
	}

}
