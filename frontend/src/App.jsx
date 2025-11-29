import { useState } from 'react'
import './App.css'
import TasksList from './components/TasksLIst'
import Login from './components/Login';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
   <div className="App">
      <h1>My Project</h1>
      
      {!isAuthenticated ? (
          // If not logged in, show Login
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
          // If logged in, show Tasks
          <TasksList />
      )}
      
    </div>
  )
}

export default App
