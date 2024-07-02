import './App.css'
import Characters from './components/Characters'
import Character from './components/Character'
import Film from './components/Film';
import Planet from './components/Planets';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/user/:id" element={<Character />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/planet/:id" element={<Planet />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
