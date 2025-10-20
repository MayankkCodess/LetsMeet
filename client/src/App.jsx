import './App.css'
import Landing from './pages/Landing.jsx'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
function App() {
 

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
