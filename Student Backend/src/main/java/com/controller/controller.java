package com.controller;

import java.io.ByteArrayOutputStream;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.model.User;
import com.service.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class controller {

    @Autowired
    private UserService service;

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.setDisallowedFields("image");
    }

    @PostMapping("/RegisterUser")
    public void addUser(@ModelAttribute User user,
                          @RequestParam("image") MultipartFile imageFile) {
       
        if (imageFile != null && !imageFile.isEmpty()) {
            try (java.io.InputStream inputStream = imageFile.getInputStream();
                 ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                user.setImage(outputStream.toByteArray());
            } catch (Exception e) {
                e.printStackTrace();
             
            }
        }

        service.saveUser(user);
     }
    
    
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(
    		@PathVariable Long id, 
    		@ModelAttribute User user, 
    		@RequestParam(value = "image", required = false) MultipartFile imageFile){
    	try {
    		if(imageFile != null && !imageFile.isEmpty()) {
    			user.setImage(imageFile.getBytes());
    		}
    		service.updateUser(id, user);
    		return ResponseEntity.ok("User updated successfully");
    	} catch (Exception e) {
    		e.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
    	}
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            String message = service.deleteUser(id);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user.");
        }
    }
    
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = service.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = service.getUserById(id); // Call service method
            if (user != null) {
                return ResponseEntity.ok(user); // Return user data if found
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
