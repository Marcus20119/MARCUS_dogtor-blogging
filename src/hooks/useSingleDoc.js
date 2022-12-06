import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { db } from '~/firebase/firebase-config';

/**
 *
 * @param {string} col - collection name
 * @param {string} id - document id
 * @param {boolean} signInRequired
 * @returns
 */

function useSingleDoc(col, id, signInRequired = 'true') {
  const { userInfo } = useAuth();
  const [document, setDocument] = useState({});

  useEffect(() => {
    if (signInRequired ? userInfo?.displayName : true) {
      const handleGetDocumentData = async () => {
        try {
          const documentDoc = await getDoc(doc(db, col, id));
          const documentData = {
            id: documentDoc.id,
            ...documentDoc.data(),
          };
          setDocument(documentData);
        } catch (err) {
          console.log(err);
        }
      };
      handleGetDocumentData();
    }
  }, [col, id, signInRequired, userInfo]);

  return document;
}
export { useSingleDoc };
