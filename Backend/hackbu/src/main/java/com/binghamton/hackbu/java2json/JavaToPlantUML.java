package com.binghamton.hackbu.java2json;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.FieldDeclaration;

import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

public class JavaToPlantUML {
    public static void main(String[] args) {
        try {
            String javaCode = "public class Person {\n" +
                    "    private String name;\n" +
                    "    private int age;\n" +
                    "    private Address address;\n" +
                    "    private List<Contact> contacts;\n" +
                    "    College collegeDetails = new College(\"testId\", \"testSpecialisation\", \"testSemester\");\n" +
                    "    \n" +
                    "    public void setAddress(Address address) {\n" +
                    "        this.address = address;\n" +
                    "    }\n" +
                    "    \n" +
                    "    public void setContacts(List<Contact> contacts) {\n" +
                    "        this.contacts = contacts;\n" +
                    "    }\n" +
                    "}\n" +
                    "\n" +
                    "class College {\n" +
                    "    private String idCard;\n" +
                    "    private String specialisation;\n" +
                    "    private String semester;\n" +
                    "    public College(String i, String spec, String sem) {" +
                    "       this.idCard = i;" +
                    "       this.specialisation = spec;" +
                    "       this.semester = sem;" +
                    "     }" +
                    "}\n" +
                    "class Address {\n" +
                    "    private String street;\n" +
                    "    private String city;\n" +
                    "    private String zipCode;\n" +
                    "}\n" +
                    "\n" +
                    "class Contact {\n" +
                    "    private String type;\n" +
                    "    private String value;\n" +
                    "}";

            // Parse Java code
            CompilationUnit cu = StaticJavaParser.parse(new StringReader(javaCode));

            // Visit and generate Plant UML text
            PlantUMLGenerator generator = new PlantUMLGenerator();
            generator.visit(cu, null);
            String plantUMLText = generator.getPlantUMLText();

            // Output Plant UML text
            System.out.println("PlantUML Text:");
            System.out.println(plantUMLText);

        } catch (Exception e) {
            System.err.println("Error parsing Java code: " + e.getMessage());
        }
    }

    public static class PlantUMLGenerator extends com.github.javaparser.ast.visitor.VoidVisitorAdapter<Void> {
        private StringBuilder plantUMLText = new StringBuilder();
        private Map<String, String> relationships = new HashMap<>();
        private String currentClass;

        @Override
        public void visit(ClassOrInterfaceDeclaration n, Void arg) {
            currentClass = n.getNameAsString();
            // Generate class definition
            plantUMLText.append("class ").append(currentClass).append(" {\n");

            // Generate attributes
            n.getFields().forEach(field -> {
                field.getVariables().forEach(variable -> {
                    plantUMLText.append("    - ").append(variable.getNameAsString()).append(": ").append(field.getElementType()).append("\n");
                });
            });

            // Generate methods
            n.getMethods().forEach(method -> {
                plantUMLText.append("    + ").append(method.getName()).append("(");
                method.getParameters().forEach(param -> {
                    plantUMLText.append(param.getName()).append(": ").append(param.getType()).append(", ");
                });
                if (!method.getParameters().isEmpty()) {
                    // Remove trailing comma and space
                    plantUMLText.delete(plantUMLText.length() - 2, plantUMLText.length());
                }
                plantUMLText.append("): ").append(method.getType()).append("\n");
            });

            plantUMLText.append("}\n");

            super.visit(n, arg);
        }

        @Override
        public void visit(FieldDeclaration n, Void arg) {
            // Extract relationships
            String fieldType = n.getElementType().asString();
            if (!fieldType.equals("String") && !fieldType.equals("int")) {
                relationships.put(currentClass + " -- \"1\" \"" + fieldType.replaceAll("<", "\\\\<").replaceAll(">", "\\\\>") + "\" : has", "");
            }
            super.visit(n, arg);
        }

        public String getPlantUMLText() {
            // Add relationships
            for (Map.Entry<String, String> entry : relationships.entrySet()) {
                plantUMLText.append(entry.getKey()).append("\n");
            }
            return "@startuml\n\n" + plantUMLText.toString() + "\n@enduml";
        }
    }
}
