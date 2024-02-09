import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateEmployeePage from './components/CreateEmployee';
import UpdateEmployeePage from './components/EditEmployee';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateEmployeePage />} />
          <Route path="/update/:id" element={<UpdateEmployeePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
