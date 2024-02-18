package com.binghamton.hackbu.image;

import net.sourceforge.plantuml.SourceStringReader;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class PlantUml {
    public static void main(String[] args) {
        try {
            File sourceFile = new File("classDiagramSource.txt");
            File outputFile = new File("classDiagram.png");

            SourceStringReader reader = new SourceStringReader("@startuml\n" + "!" + sourceFile.getAbsolutePath() + "\n@enduml");
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            reader.generateImage(outputStream);

            try (FileOutputStream fileOutputStream = new FileOutputStream(outputFile)) {
                outputStream.writeTo(fileOutputStream);
            }

            System.out.println("Class diagram image generated successfully: " + outputFile.getAbsolutePath());
        } catch (IOException e) {
            System.err.println("Error occurred while generating class diagram: " + e.getMessage());
        }
    }
}
