import { Fragment } from 'react';
import styled, { css } from 'styled-components';
import MatrixItemLarge from './MatrixItemLarge';
import MatrixItemSmall from './MatrixItemSmall';

const MatrixPostStyled = styled.div`
  ${props =>
    props.type === 2 &&
    css`
      position: relative;
      width: 100%;
      height: 650px;

      .matrixPost-wrap {
        &__full {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100vw - 12px);
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(
            circle,
            rgba(209, 171, 123, 0.6) 0%,
            #baa27750 70%
          );
          box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
            0px 2px 6px 2px rgb(60 64 67 / 15%);
          border: 1px solid rgba(0, 0, 0, 0.2);
          &-container {
            width: 1280px;
          }
        }
      }
    `};

  .matrixPost {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));

    grid-template-areas:
      'h1 h1 h1 h2 h2 h2 h3 h3'
      'h1 h1 h1 h2 h2 h2 h4 h4'
      'h1 h1 h1 h2 h2 h2 h5 h5';

    gap: 16px;
    width: 100%;
  }
  .matrixPostChild {
    &-1 {
      grid-area: h1;
      width: 100%;
    }
    &-2 {
      grid-area: h2;
      width: 100%;
    }
    &-3 {
      grid-area: h3;
      width: 100%;
    }
    &-4 {
      grid-area: h4;
      width: 100%;
    }
    &-5 {
      grid-area: h5;
      width: 100%;
    }
  }
`;

const MatrixPost = ({ posts, type = '1' }) => {
  return (
    <MatrixPostStyled type={type}>
      <div className="matrixPost-wrap__full">
        <div className="matrixPost-wrap__full-container">
          <div>
            <div className="matrixPost">
              {posts.map((post, index) => (
                <Fragment key={`matrixPost-${index}`}>
                  {index <= 1 ? (
                    <MatrixItemLarge
                      className={`matrixPostChild-${index + 1}`}
                      post={post}
                    ></MatrixItemLarge>
                  ) : (
                    <MatrixItemSmall
                      className={`matrixPostChild-${index + 1}`}
                      post={post}
                    ></MatrixItemSmall>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MatrixPostStyled>
  );
};

export { MatrixPost };
