import { useState } from 'react'
import './App.css'
import TasksList from './components/TasksLIst'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TasksList />
    </>
  )
}

export default App
