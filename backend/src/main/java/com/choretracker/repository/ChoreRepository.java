package com.choretracker.repository;

import com.choretracker.model.Chore;
import org.springframework.data.jpa.repository.JpaRepository;

// A "repository" is the layer that talks to the database. You don't write any SQL here --
// by extending JpaRepository<Chore, Long>, Spring Data JPA automatically generates
// working implementations of common methods based on the two types you gave it:
// Chore (the entity/table) and Long (the type of its @Id field).
//
// You get all of these for free just by writing this one line:
//   choreRepository.findAll()              -- SELECT * FROM chore
//   choreRepository.findById(id)            -- SELECT * FROM chore WHERE id = ?
//   choreRepository.save(chore)             -- INSERT or UPDATE, depending on whether id is set
//   choreRepository.deleteById(id)          -- DELETE FROM chore WHERE id = ?
//
// TODO (Feature 3 in the README roadmap): once you build a Bill entity, you'll create
// a near-identical BillRepository right next to this one -- same pattern, different type.
public interface ChoreRepository extends JpaRepository<Chore, Long> {
}
