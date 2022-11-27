import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchBarStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: ${props => props.height || '100%'};
  width: ${props => props.width || '265px'};
  background-color: #fff;
  overflow: hidden;

  input {
    display: block;
    height: 100%;
    width: 100%;
    padding: 8px 40px 8px 16px;
    border: solid 1px #cfcfcf;
    border-radius: 8px;
  }
  input::placeholder {
    color: #cfcfcf;
  }
  input:focus {
    border: solid 1px ${props => props.theme.color.black};
  }
  input:focus + i {
    color: ${props => props.theme.color.black};
  }
  i {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 12px;
    color: #cfcfcf;
  }
`;

/**
 *
 * @param {string} name
 * @param {string} placeholder
 */

const SearchBar = ({ name = '', placeholder = '', ...props }) => {
  console.log('again');
  return (
    <SearchBarStyled {...props}>
      <input type="text" placeholder={placeholder} name={name} />
      <i className="bx bx-search"></i>
    </SearchBarStyled>
  );
};

SearchBar.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export { SearchBar };
