package com.binghamton.hackbu.image;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImageGeneration {
    public static void imageGeneration(String[] args) {
        String jsonResponse = "{\"name\": \"John\", \"age\": 30, \"city\": \"New York\"}";

        try {
            BufferedImage image = drawJSONAsImage(jsonResponse);
            File outputImageFile = new File("");
            ImageIO.write(image, "png", outputImageFile.getAbsoluteFile());
            System.out.println("Image saved successfully." + outputImageFile);
        } catch (IOException e) {
            System.err.println("Error occurred while saving image: " + e.getMessage());
        }
    }

    private static BufferedImage drawJSONAsImage(String json) {
        int width = 400;
        int height = 200;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = image.createGraphics();

        // Clear background
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, width, height);

        // Draw JSON data
        g2d.setColor(Color.BLACK);
        g2d.setFont(new Font("Arial", Font.PLAIN, 16));
        g2d.drawString("JSON Response:", 20, 30);
        g2d.drawString(json, 20, 60);

        g2d.dispose();
        return image;
    }
}
