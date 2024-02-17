package com.binghamton.hackbu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.binghamton.hackbu.rest.InitialController;

@SpringBootApplication
public class HackbuApplication {

	public static void main(String[] args) {
		SpringApplication.run(InitialController.class, args);
	}

}
