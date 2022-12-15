import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '~/firebase/firebase-config';

/**
 * @requires
 * @param {string} col - collection's name
 * @param {string} id - document's id
 * @returns
 */

function useSingleDocRealtime(col = '', id = '') {
  const [document, setDocument] = useState({});

  useEffect(() => {
    if (col && id) {
      onSnapshot(doc(db, col, id), doc => {
        setDocument({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
  }, [col, id]);

  return document;
}
export { useSingleDocRealtime };
