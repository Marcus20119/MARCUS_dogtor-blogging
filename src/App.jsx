import { Suspense } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// const SignUpPage = lazy(() => import('./pages/SignUpPage'));
// const LoadingPage = lazy(() => import('./pages/LoadingPage'));
// const SignInPage = lazy(() => import('./pages/SignInPage'));
const LatestPage = lazy(() => import('./pages/LatestPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const AddPostPageWriter = lazy(() =>
  import('./pages/user/writer/AddPostPageWriter')
);
const AllPostsPageWriter = lazy(() =>
  import('./pages/user/writer/AllPostsPageWriter/AllPostsPageWriter')
);
const UserInfoPageWriter = lazy(() =>
  import('./pages/user/writer/UserInfoPageWriter')
);
const EditPostPageWriter = lazy(() =>
  import('./pages/user/writer/EditPostPageWriter/EditPostPageWriter')
);
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const UserLayout = lazy(() => import('./layouts/UserLayout'));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="writer">
            <Route path="add-post" element={<AddPostPageWriter />}></Route>
            <Route path="all-posts" element={<AllPostsPageWriter />}></Route>
            <Route path="user-info" element={<UserInfoPageWriter />}></Route>
            <Route
              path="edit-post/:id"
              element={<EditPostPageWriter />}
            ></Route>
          </Route>
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Navigate replace to="/latest" />} />
          <Route path="latest" element={<LatestPage />} />
          <Route path="post/:slug" element={<PostPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
