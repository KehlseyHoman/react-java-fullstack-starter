import { useEffect, useState } from 'react'

// All requests go to /api/... -- Vite's dev server proxy (see vite.config.js) forwards
// these to the Spring Boot backend on port 8080, so this file never needs to know the
// backend's real address.
const API_URL = '/api/chores'

// Each pinned card gets a small, consistent tilt so the board looks hand-pinned rather
// than perfectly gridded. Picked from a fixed list based on the chore's id, so a card's
// tilt stays the same across re-renders instead of jumping around randomly.
const TILTS = [-3, 2, -2, 3, -1, 1]
function tiltFor(id) {
  return TILTS[id % TILTS.length]
}

// This component holds all the actual chore-tracking logic: loading chores from the
// backend, adding new ones, and toggling them done. This is the part of the app most
// worth reading closely if you're learning React + a REST API together.
function ChoreBoard() {
  // React state: whenever one of these changes, React re-renders this component.
  const [chores, setChores] = useState([])       // the list of chores from the backend
  const [title, setTitle] = useState('')          // controlled input: new chore's title
  const [assignedTo, setAssignedTo] = useState('') // controlled input: who it's assigned to
  const [loading, setLoading] = useState(true)    // true while the initial fetch is in flight
  const [error, setError] = useState(null)        // holds an error message, if anything failed

  // useEffect with an empty dependency array ([]) runs once, right after this component
  // first renders -- a good place to kick off the initial data load.
  useEffect(() => {
    fetchChores()
  }, [])

  // Loads the full chore list from the backend and stores it in state.
  async function fetchChores() {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to load chores')
      const data = await response.json()
      setChores(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Runs when the "Pin to board" form is submitted. Sends the new chore to the backend,
  // then adds the backend's response (which now includes a real database id) to state.
  async function handleAddChore(event) {
    event.preventDefault() // stop the browser's default "reload the page" form behavior
    if (!title.trim()) return // ignore empty submissions

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, assignedTo }),
      })
      if (!response.ok) throw new Error('Failed to add chore')
      const newChore = await response.json()
      // Add the new chore to the end of the existing list without refetching everything.
      setChores((current) => [...current, newChore])
      // Clear the form fields for the next entry.
      setTitle('')
      setAssignedTo('')
    } catch (err) {
      setError(err.message)
    }
  }

  // Runs when a chore's checkbox is clicked. Tells the backend to flip done/not-done,
  // then updates just that one chore in state with whatever the backend confirms back.
  async function handleToggle(id) {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, { method: 'PUT' })
      if (!response.ok) throw new Error('Failed to update chore')
      const updatedChore = await response.json()
      setChores((current) =>
        current.map((chore) => (chore.id === updatedChore.id ? updatedChore : chore))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  // TODO (Feature 1 in the README roadmap): add a handleDeleteChore(id) function here,
  // mirroring handleToggle above but calling:
  //   fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  // then removing that chore from state instead of updating it, e.g.:
  //   setChores((current) => current.filter((chore) => chore.id !== id))
  // Add a button in the JSX below that calls it.

  return (
    <div className="board">
      <header className="board-header">
        <h1>The Chore Board</h1>
        <p className="subtitle">Pin it up. Cross it off. (Bills &amp; splitting come next -- see Instructions.)</p>
      </header>

      {/* A "controlled form": each input's value comes from React state (title,
          assignedTo), and every keystroke updates that state via onChange. This means
          React state is always the single source of truth for what's in the inputs. */}
      <form onSubmit={handleAddChore} className="new-card-form">
        <div className="new-card-fields">
          <input
            type="text"
            placeholder="Chore (e.g. Take out trash)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Assigned to (e.g. Sam)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <button type="submit">Pin to board</button>
      </form>

      {error && <p className="error">Couldn't reach the board: {error}</p>}

      {loading ? (
        <p className="status-text">Loading the board...</p>
      ) : (
        <ul className="card-grid">
          {chores.length === 0 && (
            <li className="empty-note">Board's empty. Pin your first chore above.</li>
          )}
          {/* .map() turns each chore object into one <li> card. `key` is required by
              React whenever you render a list -- it helps React tell cards apart when
              the list changes, instead of re-rendering everything from scratch. */}
          {chores.map((chore) => (
            <li
              key={chore.id}
              className={`chore-card${chore.done ? ' is-done' : ''}`}
              style={{ '--tilt': `${tiltFor(chore.id)}deg` }}
            >
              <span className="pin" aria-hidden="true" />
              <label>
                <input
                  type="checkbox"
                  checked={chore.done}
                  onChange={() => handleToggle(chore.id)}
                />
                <span className="chore-title">{chore.title}</span>
                {chore.assignedTo && <span className="chore-assignee">{chore.assignedTo}</span>}
              </label>
              {chore.done && <span className="stamp" aria-hidden="true">Done</span>}

              {/* TODO (Feature 1): a delete button could go right here, e.g.
                  <button onClick={() => handleDeleteChore(chore.id)}>Remove</button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ChoreBoard
