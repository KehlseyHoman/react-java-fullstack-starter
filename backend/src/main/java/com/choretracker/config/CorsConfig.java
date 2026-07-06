package com.choretracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// This is the app-wide version of the CORS permission also shown in ChoreController.java.
// @Configuration tells Spring "run this class at startup and apply whatever it sets up" --
// in this case, a rule that applies to every endpoint under /api/**, not just chores.
//
// In plain terms: without this, your browser would block the React app (running on
// http://localhost:5173) from successfully calling this API (http://localhost:8080).
// This class tells the browser "requests from localhost:5173 are allowed."
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // applies to every endpoint starting with /api/
                .allowedOrigins("http://localhost:5173") // Vite's default dev server address
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
