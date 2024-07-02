import './App.css'
import Characters from './components/Characters'
import Character from './components/Character'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/user/:id" element={<Character />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
