package com.choretracker.controller;

import com.choretracker.model.Chore;
import com.choretracker.repository.ChoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController tells Spring this class handles incoming web requests and sends back
// JSON (rather than, say, an HTML page). @RequestMapping("/api/chores") means every
// endpoint below is nested under that path -- so @GetMapping here really means
// "GET /api/chores".
@RestController
@RequestMapping("/api/chores")
// CORS (Cross-Origin Resource Sharing) is a browser security rule that blocks a page
// running on one origin (like http://localhost:5173, our React dev server) from calling
// an API on a different origin (http://localhost:8080, this backend) unless the API
// explicitly allows it. This annotation allows it for this one controller. There's also
// a global version in config/CorsConfig.java -- this one is left here as a visible
// example of how CORS can be scoped to a single resource instead of the whole app.
@CrossOrigin(origins = "http://localhost:5173")
public class ChoreController {

    // Spring automatically creates and hands us a ChoreRepository here -- this is called
    // "dependency injection". We never write `new ChoreRepository()` ourselves.
    private final ChoreRepository choreRepository;

    public ChoreController(ChoreRepository choreRepository) {
        this.choreRepository = choreRepository;
    }

    // GET /api/chores
    // Returns every chore currently in the database, as a JSON array.
    // Spring automatically converts the List<Chore> into JSON before sending it back --
    // you never manually build the JSON string yourself.
    @GetMapping
    public List<Chore> getAllChores() {
        return choreRepository.findAll();
    }

    // POST /api/chores
    // Creates a new chore. @RequestBody tells Spring to read the JSON the frontend sent
    // (e.g. { "title": "Take out trash", "assignedTo": "Sam" }) and turn it into a Chore
    // object automatically, matching JSON keys to the field names in Chore.java.
    @PostMapping
    public Chore createChore(@RequestBody Chore chore) {
        // Defensive resets: if the frontend ever accidentally sends an id or done value,
        // ignore it -- a *new* chore should always start unsaved (no id yet) and not done.
        chore.setId(null);
        chore.setDone(false);
        return choreRepository.save(chore);
    }

    // PUT /api/chores/{id}/toggle
    // Flips a chore between done and not-done. {id} in the path is captured by
    // @PathVariable Long id below -- so a request to /api/chores/3/toggle sets id = 3.
    @PutMapping("/{id}/toggle")
    public ResponseEntity<Chore> toggleChore(@PathVariable Long id) {
        // findById returns an Optional<Chore> -- a container that might be empty if no
        // chore with that id exists. .map(...) only runs if a chore was actually found;
        // .orElse(...) handles the case where it wasn't (bad id from the frontend, chore
        // already deleted, etc.) by responding with a 404 instead of crashing.
        return choreRepository.findById(id)
                .map(chore -> {
                    chore.setDone(!chore.isDone());
                    return ResponseEntity.ok(choreRepository.save(chore));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // TODO (Feature 1 in the README roadmap): add a DELETE endpoint here so a chore can
    // be removed entirely, not just checked off. It's a short addition -- something like:
    //
    //   @DeleteMapping("/{id}")
    //   public ResponseEntity<Void> deleteChore(@PathVariable Long id) {
    //       choreRepository.deleteById(id);
    //       return ResponseEntity.noContent().build();
    //   }
    //
    // Then on the frontend, add a button that calls:
    //   fetch(`/api/chores/${id}`, { method: 'DELETE' })
    // and removes that chore from React state afterward.

    // TODO (Features 3 & 4 in the README roadmap): once you build a Bill entity and its
    // own BillController, you'll add a `/api/bills/summary` endpoint somewhere that
    // calculates who owes whom. Keep that math in a separate `BillService` class rather
    // than cramming it into a controller method -- controllers should mostly just decide
    // *which* piece of logic to call, not contain the logic itself.
}
