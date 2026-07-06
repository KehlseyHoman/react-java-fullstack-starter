// This component is entirely static -- no state, no fetch calls, just JSX. It's an
// in-app quick-reference version of README.md, so a new learner can see the roadmap
// without leaving the app. The README still has the full, detailed version of everything
// below.
function Instructions() {
  return (
    <div className="board instructions-page">
      <header className="board-header">
        <h1>How This Board Works</h1>
        <p className="subtitle">A quick-reference version of the README.</p>
      </header>

      <div className="pinned-sheet">
        <span className="pin" aria-hidden="true" />

        <section>
          <h2>Running it locally</h2>
          <ol>
            <li>
              In one terminal: <code>cd backend</code>, then <code>mvn spring-boot:run</code> --
              starts the Java API on port 8080.
            </li>
            <li>
              In a second terminal: <code>cd frontend</code>, then <code>npm install</code> and{' '}
              <code>npm run dev</code> -- starts this React app on port 5173.
            </li>
          </ol>
        </section>

        <section>
          <h2>What's already built</h2>
          <ul>
            <li>View all chores</li>
            <li>Add a new chore</li>
            <li>Check a chore off (and back on)</li>
          </ul>
        </section>

        <section>
          <h2>What to build next</h2>
          <p className="section-hint">
            Roughly easiest to hardest -- pick one, get it fully working end to end, then
            move to the next.
          </p>
          <ol className="roadmap-list">
            <li><strong>Delete a chore</strong> -- a DELETE endpoint in Java, a button in React.</li>
            <li><strong>A real Person entity</strong> -- swap the free-text "assigned to" for actual roommate records.</li>
            <li><strong>A Bill entity</strong> -- same CRUD pattern as Chore, applied to shared expenses.</li>
            <li><strong>Who-owes-who math</strong> -- calculate each person's share of the bills.</li>
            <li><strong>Due dates &amp; recurring chores</strong></li>
            <li><strong>Swap H2 for Postgres</strong> -- so data survives a restart.</li>
            <li><strong>React Router</strong> -- real, URL-based pages instead of this tab toggle.</li>
            <li><strong>Sorting &amp; filtering</strong></li>
            <li><strong>Basic auth</strong> -- so each household only sees its own data.</li>
            <li><strong>Deploy it</strong> -- frontend, backend, and database, live on the internet.</li>
          </ol>
          <p className="section-hint">
            Full write-up for every step -- including what each one teaches -- is in{' '}
            <code>README.md</code>.
          </p>
        </section>

        <section>
          <h2>Where things live</h2>
          <ul>
            <li><code>backend/.../model/Chore.java</code> -- the Chore database table</li>
            <li><code>backend/.../repository/ChoreRepository.java</code> -- database access</li>
            <li><code>backend/.../controller/ChoreController.java</code> -- the REST API</li>
            <li><code>frontend/src/components/ChoreBoard.jsx</code> -- the working board UI</li>
            <li><code>frontend/src/components/Instructions.jsx</code> -- this page</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Instructions
