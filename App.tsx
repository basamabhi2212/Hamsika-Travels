import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { Booking } from './pages/Booking';
import { Confirmation } from './pages/Confirmation';
import { Admin } from './pages/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Route (No Header/Footer for clean dashboard) */}
        <Route path="/admin" element={<Admin />} />

        {/* Public Routes with Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
