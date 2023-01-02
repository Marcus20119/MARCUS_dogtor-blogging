import { useEffect } from 'react';

/**
 *
 * @param {variable} rerenderCondition - condition for re-rendering
 */

function useScrollOnTop(rerenderCondition = 'nothing') {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [rerenderCondition]);
}

export { useScrollOnTop };
