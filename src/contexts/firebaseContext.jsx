import { Fragment, useContext } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useMultiDoc, useSingleDocRealtime } from '~/hooks';
import { useAuth } from './authContext';

const FirebaseContext = createContext();

const FirebaseProvider = props => {
  const { userInfo } = useAuth();

  // Get categories
  const categories = useMultiDoc('categories');
  const categoriesName = categories.map(category => category.name);

  // Get user document
  const { document: userDocument, setDocument } = useSingleDocRealtime(
    'users',
    userInfo.uid
  );
  useEffect(() => {
    if (!userInfo) {
      setDocument({});
    }
  }, [userInfo]);

  const imgURLs = {
    userAvatar:
      'https://firebasestorage.googleapis.com/v0/b/monkey-blogging-4878f.appspot.com/o/images%2Fdefault%2Fdefault-user.png?alt=media&token=6414019c-72a3-4a99-a85b-e84b55326bf4',
  };
  return (
    <Fragment>
      <FirebaseContext.Provider
        value={{ categories, categoriesName, userDocument, imgURLs }}
        {...props}
      ></FirebaseContext.Provider>
    </Fragment>
  );
};

function useFirebase() {
  const context = useContext(FirebaseContext);
  if (typeof context === 'undefined') {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }
  const { categories, categoriesName, userDocument, imgURLs } = context;
  return { categories, categoriesName, userDocument, imgURLs };
}
export default FirebaseProvider;
export { useFirebase };
