package com.choretracker.controller;

import com.choretracker.model.Chore;
import com.choretracker.repository.ChoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chores")
// CORS is also handled globally in config/CorsConfig.java. This annotation is left here
// as a visible, per-controller example of how CORS can be scoped to one resource.
@CrossOrigin(origins = "http://localhost:5173")
public class ChoreController {

    private final ChoreRepository choreRepository;

    public ChoreController(ChoreRepository choreRepository) {
        this.choreRepository = choreRepository;
    }

    // GET /api/chores -> list every chore
    @GetMapping
    public List<Chore> getAllChores() {
        return choreRepository.findAll();
    }

    // POST /api/chores -> create a new chore
    // Expects JSON body like: { "title": "Take out trash", "assignedTo": "Sam" }
    @PostMapping
    public Chore createChore(@RequestBody Chore chore) {
        chore.setId(null); // make sure we're not accidentally overwriting an existing row
        chore.setDone(false);
        return choreRepository.save(chore);
    }

    // PUT /api/chores/{id}/toggle -> flip a chore between done and not done
    @PutMapping("/{id}/toggle")
    public ResponseEntity<Chore> toggleChore(@PathVariable Long id) {
        return choreRepository.findById(id)
                .map(chore -> {
                    chore.setDone(!chore.isDone());
                    return ResponseEntity.ok(choreRepository.save(chore));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // TODO (feature to build): add a DELETE /api/chores/{id} endpoint here.
    // Hint: choreRepository.deleteById(id) does most of the work.
}
