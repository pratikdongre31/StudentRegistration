package com.service;

import java.util.List;
import com.model.Login;
import com.model.User;


public interface UserService {

	void saveUser(User user);

	String deleteUser(Long id);

	List<User> getAllUsers();
	
	void updateUser(Long id, User user);

	User getUserById(Long id);
	
	String LoginSave(Login login);
	
	String validateUser(String username, String password);


}
