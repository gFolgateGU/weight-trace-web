import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route}     from 'react-router-dom';
import NavBarElement from './components/NavBarElement';

import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
    <NavBarElement />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
