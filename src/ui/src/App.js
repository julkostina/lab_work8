import './App.css';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './pages/Student';
import Teacher from './pages/Teacher';

function App() {
  return (
    <div className='app'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
        </Routes>
    </div>
  );
}

export default App;