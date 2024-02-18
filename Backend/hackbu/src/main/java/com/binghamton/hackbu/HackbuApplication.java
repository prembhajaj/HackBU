package com.binghamton.hackbu;

import com.binghamton.hackbu.rest.PlantUMLController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.binghamton.hackbu.rest.InitialController;

@SpringBootApplication
public class HackbuApplication {

	public static void main(String[] args) {SpringApplication.run(HackbuApplication.class, args);
	}

}
