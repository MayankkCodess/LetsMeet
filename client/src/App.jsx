import "./App.css";
import Authentication from "./pages/Authentication.jsx";
import Landing from "./pages/Landing.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.jsx"
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
