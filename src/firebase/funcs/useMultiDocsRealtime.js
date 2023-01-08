import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '~/firebase/firebase-config';

/**
 *
 * @param {string} col - collection name
 * @returns
 */

function useMultiDocsRealtime({ col = '', query = '' }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (col) {
      onSnapshot(collection(db, col), snapshot => {
        let docsData = [];
        snapshot.docs.forEach(doc => {
          docsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDocs(docsData);
      });
    }
    if (query) {
      onSnapshot(query, snapshot => {
        let docsData = [];
        snapshot.docs.forEach(doc => {
          docsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDocs(docsData);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return docs;
}
export { useMultiDocsRealtime };
