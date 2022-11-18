import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
