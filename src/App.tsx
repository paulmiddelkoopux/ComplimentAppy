import { useState } from 'react'
import ComplimentList from './ComplimentList'
import AddNewCompliment from './AddNewCompliment';
import ComplimentCounter from './ComplimentCounter';
import { auth } from './firebase';
import LogIn from './LogIn';
import './App.css'

function App() {
  const user = useState(0)

  const [compliments, setCompliments] = useState(null);

  return ( user ? ( <>
    <ComplimentCounter />
    <ComplimentList />
    <AddNewCompliment />
    </>)
   : (
    <LogIn/>
   )
  )
}

export default App
