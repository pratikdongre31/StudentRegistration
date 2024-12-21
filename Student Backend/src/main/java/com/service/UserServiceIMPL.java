package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.model.Login;
import com.model.User;
import com.repository.LoginRepo;
import com.repository.UserRepo;

@Service
public class UserServiceIMPL implements UserService {
	
	private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceIMPL(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
	
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private LoginRepo repo4;


	@Override
	@Transactional
	public void saveUser(User user) {
		repo.save(user);		
	}

	@Override
	@Transactional
	public void updateUser(Long id, User user) {
		Optional<User> existingUserOpt = repo.findById(id);
		if (existingUserOpt.isPresent()) {
			User existingUser = existingUserOpt.get();
			existingUser.setFirstName(user.getFirstName());
			existingUser.setLastName(user.getLastName());
			existingUser.setCurrentAddress(user.getCurrentAddress());
			existingUser.setPermanentAddress(user.getPermanentAddress());
			existingUser.setEducationYear(user.getEducationYear());
			existingUser.setGender(user.getGender());
			existingUser.setCountry(user.getCountry());
			existingUser.setState(user.getState());
			existingUser.setDistrict(user.getDistrict());
			if (user.getImage() != null) {
				existingUser.setImage(user.getImage());
			}
			repo.save(existingUser);
		} else {
			throw new RuntimeException("User not found.");
		}	
	}
		

	  @Override
	  @Transactional
	  public String deleteUser(Long id) {
	        Optional<User> existingUserOptional = repo.findById(id);

	        if (existingUserOptional.isPresent()) {
	            repo.deleteById(id);
	            return "User deleted successfully!";
	        } else {
	            throw new IllegalArgumentException("User not found.");
	        }
	    }
	  

	  @Override
	  @Transactional
	  public List<User> getAllUsers() {
	        return repo.findAll();
	    }
	  

		@Override
		@Transactional
		public User getUserById(Long id) {
			Optional<User> userOptional = repo.findById(id);
	        return userOptional.orElse(null);
		}
		
		
		@Override
		public String LoginSave(Login login) {
			
			System.out.println("landed on service method ");
		    if (login == null || login.getPassword() == null) {
		        System.out.println("login object or password is null");
		    }
		    login.setPassword(passwordEncoder.encode(login.getPassword()));
		    repo4.save(login); 
		    return "successful";
		}
		
		
		@Override
		public String validateUser(String username, String password) {
		  
		    Optional<Login> userOpt = repo4.findByName(username);
		    
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