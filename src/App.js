import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DocumentList from './pages/DocumentList';
import DocumentDetail from './pages/DocumentDetail';
import DocumentUpload from './components/DocumentUpload';
import DocumentLayout from './components/DocumentLayout';
import DocumentCategory from './components/DocumentCategory';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documents" element={<DocumentList />} />
          <Route path="/documents/:id" element={<DocumentDetail />} />
          <Route path="/upload" element={<DocumentUpload />} />
          <Route path="/document-view" element={<DocumentLayout />} />
          
          {/* Document viewing route with simplified PDF mapping */}
          <Route
            path="/document/:category/:type"
            element={
              <div className="document-container">
                <DocumentCategory />
                <DocumentDetail />
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;