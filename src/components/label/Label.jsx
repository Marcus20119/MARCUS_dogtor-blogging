import styled from 'styled-components';

const LabelStyled = styled.label`
  display: block;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #181818;
`;

const Label = ({ id, children, ...props }) => {
  return (
    <LabelStyled htmlFor={id} {...props}>
      {children}
    </LabelStyled>
  );
};

export default Label;
