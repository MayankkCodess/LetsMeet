import "./App.css";
import Authentication from "./pages/Authentication.jsx";
import Landing from "./pages/Landing.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {AuthProvider} from "./contexts/AuthProvider.jsx"
import VideoMeet from "./pages/VideoMeet.jsx";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/:url" element={<VideoMeet/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
