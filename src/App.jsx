import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/header';
import Footer from './components/footer';
const App = () => {
  return (
    
      <div>
        
        <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
    
        </Routes>
          <Footer/>
    </BrowserRouter>


        </div>
    
  );
};

export default App;
