import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Navigate,
} from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import WritePostPage from './pages/WritePostPage/WritePostPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ProtectedRouteHeader />
          <Routes>
            <Route path="/" element={<ProtectedRoute />} />
            <Route
              path="/login"
              element={<ProtectedRouteRedirect to="/posts" isLogin={true} />}
            />
            <Route
              path="/register"
              element={<ProtectedRouteRedirect to="/posts" isLogin={false} />}
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
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}
function ProtectedRouteRedirect({ to, isLogin }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={to} />;
  }
  return <LoginRegister isLogin={isLogin} />;
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <PostPage /> : <HomePage />;
}
function ProtectedRouteHeader() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated && <Header />;
}

export default App;
