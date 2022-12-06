import { useContext } from 'react';
import { createContext } from 'react';
import { useMultiDoc, useSingleDoc } from '~/hooks';
import { useAuth } from './authContext';

const FirebaseContext = createContext();

const FirebaseProvider = props => {
  const { userInfo } = useAuth();

  // Get categories
  const categories = useMultiDoc('categories');
  const categoriesName = categories.map(category => category.name);

  // Get user document
  const userDocument = useSingleDoc('users', userInfo.uid);

  return (
    <FirebaseContext.Provider
      value={{ categories, categoriesName, userDocument }}
      {...props}
    ></FirebaseContext.Provider>
  );
};

function useFirebase() {
  const context = useContext(FirebaseContext);
  if (typeof context === 'undefined') {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }
  const { categories, categoriesName, userDocument } = context;
  return { categories, categoriesName, userDocument };
}
export default FirebaseProvider;
export { useFirebase };
