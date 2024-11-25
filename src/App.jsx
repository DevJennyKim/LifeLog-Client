import './App.scss';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import MainPage from './pages/MainPage/MainPage';
import { AuthContextProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ProtectedRouteHeader />
          <Routes>
            <Route path="/" element={<ProtectedRoute />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/register" element={<LoginRegister />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainPage /> : <HomePage />;
}
function ProtectedRouteHeader() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Header /> : '';
}

export default App;
