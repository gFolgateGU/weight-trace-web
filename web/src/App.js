import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import NavBarElement from './components/NavBarElement';
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <Router>
    <NavBarElement />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
    </Routes>
    </Router>
  );
}

export default App;
