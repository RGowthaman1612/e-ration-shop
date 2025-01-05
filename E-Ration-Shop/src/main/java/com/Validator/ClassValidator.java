package com.Validator;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ClassValidator implements ConstraintValidator<ClassValid, Object> {
	private static Logger log = LoggerFactory.getLogger("ClassValidatorLogger");

	@Override
	public boolean isValid(Object obj, ConstraintValidatorContext context) {
		List<Field> fieldList = new ArrayList<>();
		Class<?> tmpClass = obj.getClass();

		while (tmpClass != null) {
			fieldList.addAll(Arrays.asList(tmpClass.getDeclaredFields()));
			tmpClass = tmpClass.getSuperclass();
		}

		for (Field field : fieldList) {
			field.setAccessible(true);
			try {
				Object value = field.get(obj);
				if (value != null) {

					if (value instanceof Collection) {
						Collection<?> collection = (Collection<?>) value;
						if (collection.isEmpty()) {
							log.info("Field Name: " + field.getName() + " is a collection but is empty.");
						} else {
							log.info("Field Name: " + field.getName() + " has a non-empty collection: " + collection);
							return false;
						}
					} else if (value instanceof Map) {
						Map<?, ?> map = (Map<?, ?>) value;
						if (map.isEmpty()) {
							log.info("Field Name: " + field.getName() + " is a map but is empty.");
						} else {
							log.info("Field Name: " + field.getName() + " has a non-empty map: " + map);
							return false;
						}
					} else {
						log.info(
								"Field Name: " + field.getName() + ", Value: " + value + ", Type: " + value.getClass());
					}
				} else {
					log.info("Field Name: " + field.getName() + " has no value (null).");
					return false;
				}

			} catch (IllegalAccessException e) {
				log.info("Could not access field: " + field.getName());
			}

		}
		return true;
	}

}
