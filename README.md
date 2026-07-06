# Chore & Bill Tracker (Starter Project)

![Demo of the chore board: pinning a chore, checking it off, and the Instructions tab](docs/demo.gif)

Welcome! This is a small full-stack app for roommates/couples to track shared
chores (and, once you build it, shared bills) — built as a hands-on way to
learn **React** and **Java** together.

It's not a tutorial you read — it's a working app with real gaps in it on
purpose. The chore-tracking half already runs end-to-end, frontend talking to
backend. From there, a roadmap at the bottom walks you through adding
features yourself, roughly easiest to hardest, each one teaching you something
new about React, Java, or both.

**Stack:**
- Frontend: React (JavaScript) + Vite
- Backend: Java 17 + Spring Boot + Spring Data JPA
- Database: H2 (in-memory — no install needed, resets on restart)

No prior Spring Boot or React experience is assumed, though you should be
comfortable with basic JavaScript and Java syntax going in.

---

## What already works

- View all chores
- Add a new chore (title + who it's assigned to)
- Check a chore off (and uncheck it)

That's it. Bills, splitting money, real user accounts, and more are things **you**
add — see the roadmap below.

---

## Prerequisites

- [Java 17+](https://adoptium.net/) and Maven (or use the included `mvnw` if you add one — see note below)
- [Node.js 18+](https://nodejs.org/) and npm
- Any code editor (VS Code recommended)

> Note: this starter assumes you have Maven installed globally (`mvn -version`
> should work in your terminal). If you'd rather not install Maven, you can
> generate a Maven wrapper (`mvnw`) with `mvn -N wrapper:wrapper` once, then
> commit the wrapper files.

---

## Running the backend

```bash
cd backend
mvn spring-boot:run
```

This starts the Spring Boot API on **http://localhost:8080**.

- API base: `http://localhost:8080/api/chores`
- H2 database console (peek at the raw data in your browser):
  `http://localhost:8080/h2-console`
  — JDBC URL: `jdbc:h2:mem:choretracker`, username `sa`, no password.

Data is **in-memory**: every time you stop and restart the backend, the chore
list resets to empty. That's intentional for now — see the roadmap if you want
a real database.

## Running the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

This starts the React app on **http://localhost:5173**.

## How they talk to each other

The frontend calls relative paths like `/api/chores`. Vite's dev server
(`frontend/vite.config.js`) proxies any request starting with `/api` to
`http://localhost:8080`, so the browser never needs to know the backend's
actual address, and there's no CORS headache in development. The backend also
has an explicit CORS config (`backend/.../config/CorsConfig.java`) allowing
`http://localhost:5173`, as a second example of how that's configured — useful
once you deploy frontend and backend to different domains and the proxy trick
no longer applies.

**Run both at once** (backend on 8080, frontend on 5173), then open
`http://localhost:5173` in your browser.

---

## Project structure

```
chore-bill-tracker/
├── docs/
│   └── demo.gif
├── backend/
│   └── src/main/java/com/choretracker/
│       ├── ChoreTrackerApplication.java   # entry point
│       ├── model/Chore.java               # the Chore entity/table
│       ├── repository/ChoreRepository.java# DB access (CRUD, free from Spring Data)
│       ├── controller/ChoreController.java# REST endpoints (/api/chores)
│       └── config/CorsConfig.java         # allows the frontend to call the API
└── frontend/
    └── src/
        ├── App.jsx                    # top-level component; switches Board/Instructions
        ├── App.css
        ├── main.jsx                   # React entry point
        └── components/
            ├── ChoreBoard.jsx         # the working chore-tracking UI + fetch calls
            └── Instructions.jsx       # in-app quick-reference version of this README
```

---

## Features to build next (roughly easiest → hardest)

Work through these roughly in order — each one builds a skill you'll need for
the next.

### 1. Delete a chore
- **Backend:** add a `@DeleteMapping("/{id}")` endpoint in `ChoreController` that
  calls `choreRepository.deleteById(id)`.
- **Frontend:** add a delete button next to each chore, call
  `fetch(\`/api/chores/${id}\`, { method: 'DELETE' })`, then remove it from state.
- **Teaches:** full CRUD, removing items from React state.

### 2. A real `Person` entity
Right now `assignedTo` is just a free-text string. Replace it with a proper
`Person` entity (`id`, `name`) and a relationship (`@ManyToOne`) from `Chore` to
`Person`.
- **Teaches:** JPA relationships, foreign keys, updating a frontend dropdown to
  select from real records instead of typing a name.

### 3. A `Bill` entity
Create `Bill` (`id`, `description`, `amount`, `paidBy`) with its own repository,
controller, and a second section in the UI (or a second page — see #7).
- **Teaches:** repeating the same CRUD pattern independently, so it sticks.

### 4. "Who owes whom" calculation
Given a list of bills and a list of people, calculate each person's fair share
and how much they owe or are owed, assuming an even split.
- **Backend approach:** add a `/api/bills/summary` endpoint that returns a
  computed breakdown (don't store the calculation — compute it on request).
- **Teaches:** writing business logic in a service layer instead of cramming it
  into the controller (a good time to introduce a `BillService` class).

### 5. Due dates & recurring chores
Add a `dueDate` field, then a `recurring` flag that automatically creates the
next occurrence when a chore is marked done.
- **Teaches:** working with dates in Java (`LocalDate`) and JS (`Date`), and a
  bit of scheduling logic.

### 6. Swap H2 for a real database
Move to PostgreSQL, or a hosted Postgres provider like Supabase, so data
survives a restart instead of resetting every time.
- **Teaches:** environment-specific config (`application-dev.properties` vs
  `application-prod.properties`), connection strings, not hardcoding secrets.

### 7. React Router
Split the single-page app into `/chores` and `/bills` pages instead of cramming
everything into one `App.jsx`.
- **Teaches:** `react-router-dom`, shared layout components, navigation.

### 8. Sorting & filtering
Filter chores by person or status (done/not done); sort bills by amount or
date.
- **Teaches:** derived state in React, query params in the API
  (`/api/chores?assignedTo=Sam`).

### 9. Basic auth
Add simple login so each roommate only sees their own household's data.
- **Teaches:** Spring Security basics, protecting routes on both ends.

### 10. Deploy it
Frontend to Vercel/Netlify, backend to Railway/Render, database to Supabase —
a common, free-tier-friendly combo for getting a full-stack side project
live on the internet.

---

## A note on approach

Don't try to do all ten at once. Pick one, get it fully working (backend
endpoint + frontend UI + manual test in the browser), then move to the next.
That loop — small feature, both ends, verify it works — is the actual skill
this project is meant to build.
