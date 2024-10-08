package com.binghamton.hackbu.rest;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@EnableAutoConfiguration
@CrossOrigin(origins = "*")
public class InitialController {
	@GetMapping("/")
	public String sayHello() {
		return "Hello World";
	}
}
