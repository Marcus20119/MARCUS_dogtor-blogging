const { getDocs, collection } = require('firebase/firestore');
const { useEffect, useState } = require('react');
const { db } = require('~/firebase/firebase-config');

/**
 * @requires
 * @param {string} col - collection name
 * @returns
 */

function useMultiDocs({ col, query, renderCondition = [] }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (col) {
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
    } else if (query) {
      const handleGetDocsData = async () => {
        try {
          const docsSnapshot = await getDocs(query);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...renderCondition]);
  return docs;
}

export { useMultiDocs };
