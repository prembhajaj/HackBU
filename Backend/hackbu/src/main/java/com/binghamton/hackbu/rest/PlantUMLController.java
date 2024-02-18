package com.binghamton.hackbu.rest;

import com.binghamton.hackbu.java2json.JavaToPlantUML;
import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.StringReader;

@RestController
@EnableAutoConfiguration
public class PlantUMLController {

	
    @PostMapping("/generate-uml")
    @CrossOrigin(origins = "*")
    public String generateUML(@RequestBody String javaCode) {
        try {
            // Parse Java code
        	System.out.println(javaCode);
            CompilationUnit cu = StaticJavaParser.parse(new StringReader(javaCode));

            // Visit and generate Plant UML text
            JavaToPlantUML.PlantUMLGenerator generator = new JavaToPlantUML.PlantUMLGenerator();
            generator.visit(cu, null);
            String plantUMLText = generator.getPlantUMLText();

            // Return Plant UML text
            System.out.println(plantUMLText);
            return plantUMLText;
        } catch (Exception e) {
            return "Error parsing Java code: " + e.getMessage();
        }
    }
}
