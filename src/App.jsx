import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginRegister action="login" />} />
          <Route
            path="/register"
            element={<LoginRegister action="register" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
