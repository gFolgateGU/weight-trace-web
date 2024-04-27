import { BrowserRouter, Routes, Route}     from 'react-router-dom';
import NavBar from './components/NavBar';

import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import Register from './pages/register';
import WebTokenGen from './components/WebTokenGen';

function App() {
  
  // Shared Token Generation Manager for managing
  // requests to the Backend API.
  const tokenMgr = new WebTokenGen();
  
  return (
    <BrowserRouter>
    <NavBar tokenMgr={tokenMgr}/>
    <Routes>
        <Route path='/' element={<Home tokenMgr={tokenMgr}/>} />
        <Route path='/about' element={<About tokenMgr={tokenMgr} />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/register' element={<Register tokenMgr={tokenMgr}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
