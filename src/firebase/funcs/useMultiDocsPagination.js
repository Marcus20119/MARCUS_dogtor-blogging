import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function useMultiDocsPagination({
  firstQuery,
  nextQuery,
  setLastSnapshot,
  reRenderCondition,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Cần xử lý riêng trường hợp loading đầu tiên ví dụ như loading
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(false);

  // First data, run only 1 times when mounting
  useEffect(() => {
    const handleGetFirstData = async () => {
      setIsLoadingFirstTime(true);
      setIsLoading(true);
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
      setIsLoadingFirstTime(false);
      setIsLoading(false);
    };
    handleGetFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...reRenderCondition]);

  // Update whenever load more button is clicked
  useEffect(() => {
    if (nextQuery) {
      const handleGetNewData = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
      };
      handleGetNewData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuery]);
  return { data, setData, isLoading, isLoadingFirstTime };
}

export { useMultiDocsPagination };
