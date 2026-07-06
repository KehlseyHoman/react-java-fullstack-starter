package com.choretracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication is shorthand for three separate annotations Spring needs to
// find and wire together everything else in this project (the entity, repository,
// controller, and config classes) -- you won't usually need to touch this file again.
@SpringBootApplication
public class ChoreTrackerApplication {

    // The main method is the actual entry point when you run `mvn spring-boot:run` --
    // this line starts an embedded web server (Tomcat, by default) on port 8080 and
    // keeps it running until you stop it (Ctrl+C).
    public static void main(String[] args) {
        SpringApplication.run(ChoreTrackerApplication.class, args);
    }

}
