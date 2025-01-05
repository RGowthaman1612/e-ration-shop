package com.E_Ration_Shop.E_Ration.Shop.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT) 
public class CustomException extends RuntimeException {
	 private static final long serialVersionUID = 1L;

	    public CustomException(String message) {
	        super(message);
	    }
}
