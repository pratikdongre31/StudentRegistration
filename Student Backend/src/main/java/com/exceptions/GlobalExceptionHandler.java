package com.exceptions;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UserNotFoundException.class)
	public String exceptionHandler(UserNotFoundException unfe) {
		return "UserNotFoundException"+unfe.getMessage();
	}
}
