import styled from 'styled-components';

const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  width: ${props => props.width || '100%'}; ;
`;

const Field = ({ children, ...props }) => {
  return <FieldStyled {...props}>{children}</FieldStyled>;
};

export default Field;
