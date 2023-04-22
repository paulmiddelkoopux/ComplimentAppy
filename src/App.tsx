import { useState } from 'react'
import ComplimentList from './ComplimentList'
import AddNewCompliment from './AddNewCompliment';
import ComplimentCounter from './ComplimentCounter';
import './App.css'

function App() {

  const [compliments, setCompliments] = useState(null);

  return (
    <>
    <ComplimentCounter />
    <ComplimentList />
    <AddNewCompliment />
    </>
  )
}

export default App
