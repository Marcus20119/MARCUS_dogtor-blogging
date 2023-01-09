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

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      try {
        if (col) {
          onSnapshot(collection(db, col), snapshot => {
            let docsData = [];
            snapshot.docs.forEach(doc => {
              docsData.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            resolve(docsData);
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
            resolve(docsData);
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const data = await fetchData();
        setDocs(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return docs;
}
export { useMultiDocsRealtime };
