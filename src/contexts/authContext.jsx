import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { auth } from '~/firebase/firebase-config';

const AuthContext = createContext();

const AuthProvider = props => {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUserInfo(currentUser);
      } else {
        setUserInfo('');
      }
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within AuthContext');
  }
  const { userInfo, setUserInfo } = context;
  return { userInfo, setUserInfo };
}

export default AuthProvider;
export { useAuth };
