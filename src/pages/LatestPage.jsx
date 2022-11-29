import styled from 'styled-components';
import { MatrixPost } from '~/components/module';
import { useAuth } from '~/contexts/authContext';

const LatestStyled = styled.div`
  width: 100%;
`;

const LatestPage = () => {
  const { userInfo } = useAuth();
  return (
    <LatestStyled>
      <MatrixPost />
    </LatestStyled>
  );
};

export default LatestPage;
