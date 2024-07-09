import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/header';
import Footer from './components/footer';
const App = () => {
  return (
    
      <div>
        
        <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
          <Footer/>
    </BrowserRouter>


        </div>
    
  );
};

export default App;
