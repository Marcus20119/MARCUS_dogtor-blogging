import { Suspense } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const LatestPage = lazy(() => import('./pages/LatestPage'));
const AddPostPage = lazy(() => import('./pages/user/AddPostPage'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const UserLayout = lazy(() => import('./layouts/UserLayout'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Navigate replace to="/latest" />} />
          <Route path="latest" element={<LatestPage />} />
        </Route>
        <Route path="user" element={<UserLayout />}>
          <Route path="add-post" element={<AddPostPage />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
