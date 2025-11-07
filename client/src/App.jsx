
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing.jsx';
import Authentication from './pages/Authentication.jsx';
import {AuthProvider} from "./contexts/AuthProvider.jsx"
import VideoMeet from './pages/VideoMeet.jsx';
import HomeWithAuth from './pages/HomeWithAuth.jsx';
import History from './pages/History.jsx';

function App() {
  return (
    <div className="App">

      <Router>

        <AuthProvider>


          <Routes>

            <Route path='/' element={<LandingPage />} />

            <Route path='/auth' element={<Authentication />} />

            <Route path='/home's element={<HomeWithAuth />} />
            <Route path='/history' element={<History />} />
            <Route path='/:url' element={<VideoMeet />} />
          </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;