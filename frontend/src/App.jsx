import { useState } from 'react'
import ChoreBoard from './components/ChoreBoard.jsx'
import Instructions from './components/Instructions.jsx'

// App.jsx is the top-level component. Its only job right now is deciding which "page"
// to show: the actual chore board, or the in-app instructions/roadmap.
//
// This isn't real routing (there's no URL change, and refreshing always lands back on
// the board) -- it's just a piece of state that says which component to render. Real
// page-based routing with react-router-dom is TODO (Feature 7 in the README roadmap).
// This simpler version is a good first taste of the same idea: conditionally rendering
// different components based on state.
function App() {
  // view can be either 'board' or 'instructions'. Changing it with setView() causes
  // React to re-render and show the other component below.
  const [view, setView] = useState('board')

  return (
    <div className="app-shell">
      <nav className="view-tabs">
        <button
          className={view === 'board' ? 'active' : ''}
          onClick={() => setView('board')}
        >
          Board
        </button>
        <button
          className={view === 'instructions' ? 'active' : ''}
          onClick={() => setView('instructions')}
        >
          Instructions
        </button>
      </nav>

      {/* Only one of these ever renders at a time, based on the `view` state above. */}
      {view === 'board' ? <ChoreBoard /> : <Instructions />}
    </div>
  )
}

export default App
