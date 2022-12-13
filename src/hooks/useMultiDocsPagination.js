import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function useMultiDocsPagination({
  firstQuery,
  nextQuery,
  setLastSnapshot,
  reRenderCondition,
}) {
  const [data, setData] = useState([]);

  // First data, run only 1 times when mounting
  useEffect(() => {
    const handleGetFirstData = async () => {
      const documentSnapshots = await getDocs(firstQuery);
      let firstData = [];
      documentSnapshots.docs.forEach(doc => {
        firstData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(firstData);
      setLastSnapshot(
        documentSnapshots.docs[documentSnapshots.docs.length - 1]
      );
    };
    handleGetFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRenderCondition]);

  // Update whenever load more button is clicked
  useEffect(() => {
    if (nextQuery) {
      const handleGetNewData = async () => {
        const documentSnapshots = await getDocs(nextQuery);
        let newData = [...data];
        documentSnapshots.docs.forEach(doc => {
          newData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setData(newData);
        setLastSnapshot(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );
      };
      handleGetNewData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuery]);
  return data;
}

export { useMultiDocsPagination };
