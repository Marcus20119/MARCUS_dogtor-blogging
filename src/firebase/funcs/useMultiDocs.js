const { getDocs, collection } = require('firebase/firestore');
const { useEffect, useState } = require('react');
const { db } = require('~/firebase/firebase-config');

/**
 * @requires
 * @param {string} col - collection name
 * @returns
 */

function useMultiDoc(col) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const handleGetDocsData = async () => {
      try {
        const docsSnapshot = await getDocs(collection(db, col));
        let docsData = [];
        docsSnapshot.docs.forEach(doc => {
          docsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDocs(docsData);
      } catch (err) {
        console.log(err);
      }
    };
    handleGetDocsData();
  }, [col]);
  return docs;
}

export { useMultiDoc };
