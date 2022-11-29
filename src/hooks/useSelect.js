import { useEffect, useRef, useState } from 'react';

function useSelect({
  defaultOption,
  watchOptionValue,
  setValue,
  setError,
  name,
}) {
  const selectRef = useRef();
  const [selectedValue, setSelectedValue] = useState(defaultOption);

  const handleShow = (selectElement, wrapOptionsElement) => {
    selectElement.classList.add('hidden');
    wrapOptionsElement.classList.remove('hidden');
  };
  const handleHide = (selectElement, wrapOptionsElement) => {
    selectElement.classList.remove('hidden');
    wrapOptionsElement.classList.add('hidden');
  };
  useEffect(() => {
    if (watchOptionValue === '') {
      setSelectedValue(defaultOption);
    }
  }, [defaultOption, watchOptionValue]);

  useEffect(() => {
    const handleSetSelectedValue = e => {
      setSelectedValue(e.target.textContent);
      if (setValue) {
        name
          ? setValue(name, e.target.textContent)
          : setValue(e.target.textContent);
      }
      if (setError) {
        name
          ? setError(name, e.target.textContent)
          : setError(e.target.textContent);
      }
    };
    const selectElement = selectRef.current.firstChild;
    const wrapOptionsElement = selectRef.current.lastChild;
    const optionsElement = Array.from(wrapOptionsElement.children);
    if (selectRef?.current) {
      selectElement.addEventListener('click', e => {
        e.stopPropagation();
        handleShow(selectElement, wrapOptionsElement);
      });
      window.addEventListener('click', () => {
        handleHide(selectElement, wrapOptionsElement);
      });
      optionsElement.forEach(optionElement => {
        optionElement.addEventListener('click', e => {
          e.stopPropagation();
          handleSetSelectedValue(e);
          handleHide(selectElement, wrapOptionsElement);
        });
      });
    }
    return () => {
      selectElement.removeEventListener('click', () => {
        handleShow(selectElement, wrapOptionsElement);
      });
      window.removeEventListener('click', () => {
        handleHide(selectElement, wrapOptionsElement);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    selectRef,
    selectedValue,
  };
}

export { useSelect };
