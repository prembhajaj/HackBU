package com.binghamton.hackbu.java2json;

import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

import java.io.PrintWriter;

public class JavaToPlantUMLVisitor extends VoidVisitorAdapter<PrintWriter> {
    @Override
    public void visit(CompilationUnit n, PrintWriter writer) {
        writer.println("@startuml");
        // Generate PlantUML string from the Java AST
        // Example: writer.println("class " + n.getTypes().get(0).getName() + " {}");
        writer.println("@enduml");
    }
}
