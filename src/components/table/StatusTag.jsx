import styled from 'styled-components';

const StatusTagStyled = styled.div`
  span {
    display: inline-block;
    border-radius: 10px;
    padding: 4px 10px;
    font-weight: 500;
    min-width: 100px;
    text-align: center;
  }
  .statusTag--Approved {
    color: #65a30d;
    background-color: #ecfccb;
  }
  .statusTag--Pending {
    color: #eab308;
    background-color: #fef9c3;
  }
  .statusTag--Rejected {
    color: #ef4444;
    background-color: #fee2e2;
  }
`;

const StatusTag = ({ status, ...rest }) => {
  let statusText = '';
  switch (status) {
    case 1:
      statusText = 'Approved';
      break;
    case 2:
      statusText = 'Pending';
      break;
    case 3:
      statusText = 'Rejected';
      break;
    default:
      break;
  }
  return (
    <StatusTagStyled status={status} {...rest}>
      <span className={`statusTag--${statusText}`}>{statusText}</span>
    </StatusTagStyled>
  );
};

export { StatusTag };
