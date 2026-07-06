import { useEffect, useState } from 'react'

// All requests go to /api/... -- Vite's dev server proxy (see vite.config.js)
// forwards these to the Spring Boot backend on port 8080.
const API_URL = '/api/chores'

function App() {
  const [chores, setChores] = useState([])
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchChores()
  }, [])

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

  async function handleAddChore(event) {
    event.preventDefault()
    if (!title.trim()) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, assignedTo }),
      })
      if (!response.ok) throw new Error('Failed to add chore')
      const newChore = await response.json()
      setChores((current) => [...current, newChore])
      setTitle('')
      setAssignedTo('')
    } catch (err) {
      setError(err.message)
    }
  }

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

  return (
    <div className="app">
      <h1>Chore Tracker</h1>
      <p className="subtitle">Starter project -- bills &amp; splitting come next. See README.</p>

      <form onSubmit={handleAddChore} className="add-form">
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
        <button type="submit">Add Chore</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading chores...</p>
      ) : (
        <ul className="chore-list">
          {chores.length === 0 && <li className="empty">No chores yet -- add one above.</li>}
          {chores.map((chore) => (
            <li key={chore.id} className={chore.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={chore.done}
                  onChange={() => handleToggle(chore.id)}
                />
                <span className="chore-title">{chore.title}</span>
                {chore.assignedTo && <span className="chore-assignee">({chore.assignedTo})</span>}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
