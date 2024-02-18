package com.binghamton.hackbu.java2json;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ConvertJava2Json {
    public static void main(String[] args) {
        String inputString = "public class HelloWorld {\n" +
                "    public static void main(String[] args) {\n" +
                "        System.out.println(\"Hello, World!\");\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "// Another code snippet\n" +
                "int x = 10;\n" +
                "int y = 20;\n" +
                "System.out.println(x + y);";

        // Define a pattern to match code snippets
        Pattern pattern = Pattern.compile("(?s)\\b(public\\s+class.*?\\})|\\b(//.*?\\n(.*\\n)*)");
        Matcher matcher = pattern.matcher(inputString);

        // Create a JSON array to store code snippet objects
        JsonArray jsonArray = new JsonArray();

        // Iterate through matches and add them to the JSON array
        while (matcher.find()) {
            JsonObject snippetObject = new JsonObject();
            String snippet = matcher.group().trim();
            snippetObject.addProperty("snippet", snippet);
            jsonArray.add(snippetObject);
        }

        // Convert JSON array to string
        Gson gson = new Gson();
        String jsonOutput = gson.toJson(jsonArray);

        // Print JSON output
        System.out.println(jsonOutput);
    }
}

