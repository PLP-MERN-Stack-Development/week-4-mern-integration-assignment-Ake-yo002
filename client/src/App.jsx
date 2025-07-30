// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Corrected App.jsx
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}