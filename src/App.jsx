import './App.scss';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import WritePostPage from './pages/WritePostPage/WritePostPage';

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
            <Route path="/posts" element={<PostPage />} />
            <Route path="/posts/category/:categoryId" element={<PostPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/add-post" element={<WritePostPage action="add" />} />
            <Route
              path="/edit-post/:postId"
              element={<WritePostPage action="update" />}
            />
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
  return currentUser && <Header />;
}

export default App;
