package com.Validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;



public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

	@Override
	public boolean isValid(String password, ConstraintValidatorContext context) {
		if (password == null) {
			return false;
		}
		int min = 8;
		int digit = 0;
		int special = 0;
		int upCount = 0;
		int loCount = 0;
		if (password.length() >= min) {
			for (int i = 0; i < password.length(); i++) {
				char c = password.charAt(i);
				if (Character.isUpperCase(c)) {
					upCount++;
				}
				if (Character.isLowerCase(c)) {
					loCount++;
				}
				if (Character.isDigit(c)) {
					digit++;
				}
				if (c >= 33 && c <= 46 || c == 64) {
					special++;
				}
				if (special >= 1 && loCount >= 1 && upCount >= 1 && digit >= 1) {
					return true;
				}
			}
		}

		return false;
	}
}
