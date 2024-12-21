package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.model.Student;
import com.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {
	
	@Autowired
	private StudentService studService;
	
	@InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.setDisallowedFields("image");
    }
	
	
	// To add student
	@PostMapping("/registerStudent")
    public void addStudent(@ModelAttribute Student student) {
        studService.saveStudent(student);
     }
	
	
	// To update student by id
	@PutMapping("/update/student/{id}")
    public ResponseEntity<String> updateStudent(
    		@PathVariable Long id, 
    		@ModelAttribute Student student){
    	try {
    		studService.updateStudent(id, student);
    		return ResponseEntity.ok("User updated successfully");
    	} catch (Exception e) {
    		e.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
    	}
    }
	
	
	// To delete student by id
	@DeleteMapping("/delete/student/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        try {
            String message = studService.deleteStudent(id);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user.");
        }
    }
	
	
	// To get all students
	@GetMapping("/getAllStudents")
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> students = studService.getAllStudents();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	
	// To get student by id
	@GetMapping("/getStudentById/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        try {
            Student student = studService.getStudentById(id); // Call service method
            if (student != null) {
                return ResponseEntity.ok(student); // Return user data if found
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null); // If user not found, return 404
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Handle errors
        }
    }

	
	
}
