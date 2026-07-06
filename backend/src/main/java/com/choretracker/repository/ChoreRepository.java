package com.choretracker.repository;

import com.choretracker.model.Chore;
import org.springframework.data.jpa.repository.JpaRepository;

// Extending JpaRepository gives us save(), findAll(), findById(), deleteById(), etc.
// for free -- no SQL required for basic CRUD.
public interface ChoreRepository extends JpaRepository<Chore, Long> {
}
