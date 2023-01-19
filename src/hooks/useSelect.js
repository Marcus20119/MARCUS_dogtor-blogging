import { useEffect, useRef, useState } from 'react';

function useSelect({
  defaultOption,
  watchOptionValue,
  setValue,
  setError,
  name,
  options,
}) {
  const selectRef = useRef();
  const [selectedValue, setSelectedValue] = useState(defaultOption);

  useEffect(() => {
    if (watchOptionValue === '') {
      setSelectedValue(defaultOption);
    }
  }, [defaultOption, watchOptionValue]);

  useEffect(() => {
    if (selectRef?.current) {
      const selectElement = selectRef.current.firstChild;
      const wrapOptionsElement = selectRef.current.lastChild;
      const optionsElement = Array.from(wrapOptionsElement.children);

      const handleShow = e => {
        e.stopPropagation();
        selectElement.classList.add('hidden');
        wrapOptionsElement.classList.remove('hidden');
      };
      const handleHide = () => {
        selectElement.classList.remove('hidden');
        wrapOptionsElement.classList.add('hidden');
      };
      const handleSetSelectedValue = e => {
        e.stopPropagation();
        // Xử lý vấn đề Food n Drink
        const fixedValue =
          e.target.textContent === 'Food & Drink'
            ? 'Food n Drink'
            : e.target.textContent;
        setSelectedValue(fixedValue);
        if (setValue) {
          name ? setValue(name, fixedValue) : setValue(fixedValue);
        }
        if (setError) {
          name ? setError(name, fixedValue) : setError(fixedValue);
        }
        handleHide();
      };

      selectElement.addEventListener('click', handleShow);
      window.addEventListener('click', handleHide);
      optionsElement.forEach(optionElement => {
        optionElement.addEventListener('click', handleSetSelectedValue);
      });
      return () => {
        selectElement.removeEventListener('click', handleShow);
        window.removeEventListener('click', handleHide);
        optionsElement.forEach(optionElement => {
          optionElement.removeEventListener('click', handleSetSelectedValue);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return {
    selectRef,
    selectedValue,
  };
}

export { useSelect };
