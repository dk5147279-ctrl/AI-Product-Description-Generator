import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';   // Lowercase 'n' to match navbar.jsx
import Footer from './components/footer';   // Lowercase 'f' to match footer.jsx
import Home from './Pages/Home';             // Capital 'P' to match Pages folder
import About from './Pages/About';           // Capital 'P' to match Pages folder
import Dashboard from './Pages/Dashboard';   // Capital 'P' to match Pages folder
import Login from './Pages/Login';           // Capital 'P' to match Pages folder

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;