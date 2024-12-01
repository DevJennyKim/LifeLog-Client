import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import WritePostPage from './pages/WritePostPage/WritePostPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ProtectedRouteHeader />
          <Routes>
            <Route path="/" element={<ProtectedRoute />} />
            <Route path="/login" element={<LoginRegister isLogin={true} />} />
            <Route
              path="/register"
              element={<LoginRegister isLogin={false} />}
            />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/posts/category/:categoryId" element={<PostPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/add-post" element={<WritePostPage action="add" />} />
            <Route
              path="/edit-post/:postId"
              element={<WritePostPage action="update" />}
            />
            <Route path="/user-profile" element={<UserProfilePage />} />
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
