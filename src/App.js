import React from 'react';
import './App.css';
import './scss/app.scss';

import Header from './components/Header';
import Footer from './components/Footer'; // Już zaimportowany
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullAnime from './components/FullAnime';
import OrderSuccess from './components/Order/OrderSuccess';
import { Routes, Route } from 'react-router-dom';

import './i18n'; // Import i18n

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/anime/:id" element={<FullAnime />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        {/* Dodanie stopki tutaj */}
        <div class="pagination-separator"></div>
        <Footer />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
