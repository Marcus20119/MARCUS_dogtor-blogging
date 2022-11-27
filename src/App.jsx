import { Suspense } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Navigate replace to="/home" />} />
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
