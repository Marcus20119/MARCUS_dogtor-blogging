import { useEffect } from 'react';

/**
 *
 * @param {variable} rerenderCondition - condition for re-rendering
 */

function useScrollOnTop(rerenderCondition) {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderCondition]);
}

export { useScrollOnTop };
