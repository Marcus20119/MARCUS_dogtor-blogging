import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { db } from '~/firebase/firebase-config';

/**
 * @requires
 * @param {string} col - collection's name
 * @param {string} id - document's id
 * @returns
 */

function useSingleDocRealtime({ col = '', id = '' }) {
  const { userInfo } = useAuth();
  const [document, setDocument] = useState({});

  useEffect(() => {
    if (userInfo && col && id) {
      onSnapshot(doc(db, col, id), doc => {
        setDocument({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
  }, [userInfo, col, id]);

  return { document, setDocument };
}
export { useSingleDocRealtime };
