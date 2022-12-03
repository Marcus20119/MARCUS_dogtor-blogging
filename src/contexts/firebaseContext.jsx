import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { db } from '~/firebase/firebase-config';

const FirebaseContext = createContext();

const FirebaseProvider = props => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const handleGetData = async () => {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      let categoriesData = [];
      categoriesSnapshot.docs.forEach(doc => {
        categoriesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(categoriesData);
    };
    handleGetData();
  }, []);
  const categoriesName = categories.map(category => category.name);
  return (
    <FirebaseContext.Provider
      value={{ categories, categoriesName }}
      {...props}
    ></FirebaseContext.Provider>
  );
};

function useFirebase() {
  const context = useContext(FirebaseContext);
  if (typeof context === 'undefined') {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }
  const { categories, categoriesName } = context;
  return { categories, categoriesName };
}
export default FirebaseProvider;
export { useFirebase };
