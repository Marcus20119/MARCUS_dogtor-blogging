import styled from 'styled-components';
import MatrixItemLarge from './MatrixItemLarge';

const data = [
  {
    title: 'This is a post title This is a post title',
    path: '/latest',
    img: '/imgs/post-img.jpg',
    author: 'Marcus Freeman',
    createdAt: 'Mar 4th',
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laboriosam libero modi, nemo adipisci iusto vel laborum similique numquam omnis in aspernatur est ullam ratione impedit porro labore, harum a?',
  },
  {
    title: 'This is a post title This is a post title',
    path: '/latest',
    img: '/imgs/post-img.jpg',
    author: 'Marcus Freeman',
    createdAt: 'Mar 4th',
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laboriosam libero modi, nemo adipisci iusto vel laborum similique numquam omnis in aspernatur est ullam ratione impedit porro labore, harum a?',
  },
  {
    title: 'This is a post title This is a post title',
    path: '/latest',
    img: '/imgs/post-img.jpg',
    author: 'Marcus Freeman',
    createdAt: 'Mar 4th',
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laboriosam libero modi, nemo adipisci iusto vel laborum similique numquam omnis in aspernatur est ullam ratione impedit porro labore, harum a?',
  },
  {
    title: 'This is a post title This is a post title',
    path: '/latest',
    img: '/imgs/post-img.jpg',
    author: 'Marcus Freeman',
    createdAt: 'Mar 4th',
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laboriosam libero modi, nemo adipisci iusto vel laborum similique numquam omnis in aspernatur est ullam ratione impedit porro labore, harum a?',
  },
  {
    title: 'This is a post title This is a post title',
    path: '/latest',
    img: '/imgs/post-img.jpg',
    author: 'Marcus Freeman',
    createdAt: 'Mar 4th',
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laboriosam libero modi, nemo adipisci iusto vel laborum similique numquam omnis in aspernatur est ullam ratione impedit porro labore, harum a?',
  },
];

const MatrixPostStyled = styled.div`
  width: 1280px;
  margin: 0 auto;

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

const MatrixPost = () => {
  return (
    <MatrixPostStyled>
      <div className="matrixPost">
        <MatrixItemLarge
          className="matrixPostChild-1"
          data={data[0]}
        ></MatrixItemLarge>
        <MatrixItemLarge
          className="matrixPostChild-2"
          data={data[1]}
        ></MatrixItemLarge>
        <div className="matrixPostChild-3">sdf</div>
        <div className="matrixPostChild-4">sdf</div>
        <div className="matrixPostChild-5">sdf</div>
      </div>
    </MatrixPostStyled>
  );
};

export { MatrixPost };
