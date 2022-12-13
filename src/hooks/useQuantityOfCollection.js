const { collection, getDocs } = require('firebase/firestore');
const { useState, useEffect } = require('react');
const { db } = require('~/firebase/firebase-config');

function useQuantityOfCollection({ col = '', query = '' }) {
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    if (col) {
      const handleGetQuantity = async () => {
        try {
          const docsSnapshot = await getDocs(collection(db, col));
          setQuantity(docsSnapshot.size);
        } catch (err) {
          console.log(err);
        }
      };
      handleGetQuantity();
    }
    if (query) {
      const handleGetQuantity = async () => {
        try {
          const docsSnapshot = await getDocs(query);
          setQuantity(docsSnapshot.size);
        } catch (err) {
          console.log(err);
        }
      };
      handleGetQuantity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return quantity;
}

export { useQuantityOfCollection };
