import { collection, query, orderBy } from 'firebase/firestore';
import { Fragment, useContext } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { db } from '~/firebase/firebase-config';
import { useMultiDocs, useSingleDocRealtime } from '~/firebase/funcs';
import { useAuth } from './authContext';

const FirebaseContext = createContext();

const FirebaseProvider = props => {
  const { userInfo } = useAuth();

  // Get categories
  const categoriesQuery = query(
    collection(db, 'categories'),
    orderBy('name', 'asc')
  );
  const categories = useMultiDocs({ query: categoriesQuery });
  const categoriesName = categories.map(category => category.name);

  // Get user document
  const { document: userDocument, setDocument } = useSingleDocRealtime({
    col: 'users',
    id: userInfo.uid,
  });
  useEffect(() => {
    if (!userInfo) {
      setDocument({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const imgURLs = {
    userAvatar:
      'https://firebasestorage.googleapis.com/v0/b/monkey-blogging-4878f.appspot.com/o/images%2Fdefault%2Fdefault-user.png?alt=media&token=6414019c-72a3-4a99-a85b-e84b55326bf4',
    transparent:
      'https://firebasestorage.googleapis.com/v0/b/monkey-blogging-4878f.appspot.com/o/images%2Fdefault%2Ftransparent.png?alt=media&token=9dc658f8-00cb-4793-986a-15ed1a12f409',
    loading:
      'https://firebasestorage.googleapis.com/v0/b/monkey-blogging-4878f.appspot.com/o/images%2Fdefault%2Floading-gif.gif?alt=media&token=23d4e1e8-1d44-4a3c-b310-5c98fc697cbe',
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
