import './App.scss';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import { AuthContextProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ProtectedRouteHeader />
          <Routes>
            <Route path="/" element={<ProtectedRoute />} />
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
  const { currentUser } = useAuth();
  return currentUser ? <PostPage /> : <HomePage />;
}
function ProtectedRouteHeader() {
  const { currentUser } = useAuth();
  return currentUser ? <Header /> : '';
}

export default App;
