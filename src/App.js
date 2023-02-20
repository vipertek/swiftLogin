import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// importing pages
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/:email" element={<Home />} />
          <Route exact path="/home/:email" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
