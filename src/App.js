import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from './pages/auth/Index';
import Main from './pages/main/Main';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' exact element={<Index/>}/>
        <Route path='/main' exact element={<Main/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
