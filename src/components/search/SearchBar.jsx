import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { forwardRef } from 'react';

const SearchBarStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: ${props => props.height || '100%'};
  width: ${props => props.width || '265px'};
  background-color: #fff;
  overflow: hidden;
  border-radius: 666px;

  input {
    display: block;
    height: 100%;
    width: 100%;
    padding: 8px 40px 8px 16px;
    border: solid 1px #cfcfcf;
    border-radius: 666px;
  }
  input::placeholder {
    color: #cfcfcf;
  }
  input:focus {
    border: solid 1px ${props => props.theme.color.brown};
  }
  input:focus + i {
    color: ${props => props.theme.color.brown};
  }
  i {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    padding: 0 12px;
    color: #cfcfcf;
  }
`;

/**
 *
 * @param {string} name
 * @param {string} placeholder
 */

const SearchBar = forwardRef(
  (
    {
      name = '',
      placeholder = '',
      defaultValue = '',
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    const alternativeRef = useRef();
    return (
      <SearchBarStyled {...props}>
        <input
          ref={ref || alternativeRef}
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
          autoComplete="off"
        />
        <i className="bx bx-search"></i>
      </SearchBarStyled>
    );
  }
);

SearchBar.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

export { SearchBar };
