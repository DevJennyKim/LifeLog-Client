import './App.scss';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import AddPostPage from './pages/AddPostPage/AddPostPage';

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
            <Route path="/posts" element={<PostPage />} />
            <Route path="/posts/category/:categoryId" element={<PostPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/write" element={<AddPostPage />} />
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
