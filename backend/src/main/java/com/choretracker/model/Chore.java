package com.choretracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// @Entity tells Spring (specifically Hibernate, the library that talks to the database
// on Spring's behalf) that this class represents a database table. Spring will
// automatically create a "chore" table with a column for each field below.
@Entity
public class Chore {

    // @Id marks this field as the table's primary key.
    // @GeneratedValue tells the database to pick the next id automatically (1, 2, 3, ...)
    // every time we save a new Chore -- we never set this ourselves.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // What the chore is, e.g. "Take out trash".
    private String title;

    // Who it's assigned to, as plain text for now (e.g. "Sam").
    //
    // TODO (Feature 2 in the README roadmap): replace this with a real `Person` entity
    // and a @ManyToOne relationship, so "assignedTo" becomes an actual link to a
    // Person record instead of a free-text guess at spelling someone's name correctly.
    private String assignedTo;

    // Whether the chore has been completed. Defaults to false for new chores.
    private boolean done;

    // JPA (the database layer) requires a no-argument constructor so it can build
    // Chore objects when reading rows back out of the database. You won't call this
    // directly yourself.
    public Chore() {
    }

    // The constructor we actually use in code, e.g. `new Chore("Take out trash", "Sam")`.
    public Chore(String title, String assignedTo) {
        this.title = title;
        this.assignedTo = assignedTo;
        this.done = false;
    }

    // --- Getters and setters below ---
    // Spring Boot (and JPA, and the JSON conversion when sending data to React) rely on
    // these to read and write each field. This is boilerplate you'll write a lot in Java --
    // some IDEs (like IntelliJ) can generate it for you automatically.

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
