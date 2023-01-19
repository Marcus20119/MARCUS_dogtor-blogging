import { Fragment } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ListPost } from '~/components/module';
import { useScrollOnTop } from '~/hooks';

const CategoryPageStyled = styled.div`
  .categoryPage-title {
    font-size: 48px;
    font-weight: 500;
    text-align: center;
    margin: 0 auto;
    color: ${props => props.theme.color.brown};
    font-family: ${props => props.theme.font.tertiary};
    letter-spacing: 2px;
    text-shadow: 0 0 1px ${props => props.theme.color.darkBrown};
    margin-bottom: 4px;
  }
  .categoryPage-gap {
    position: relative;
    margin: 0 auto 24px auto;
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    gap: 4px;
    width: 100%;
    margin-bottom: 48px;

    i {
      color: #ccc;
      font-size: 20px;
    }
    i:first-child,
    i:last-child {
      font-size: 16px;
    }
    &::after,
    &::before {
      content: '';
      position: absolute;
      bottom: 30%;
      height: 2px;
      width: 200px;
      background-color: #ccc;
    }
    &::after {
      right: 30%;
    }
    &::before {
      left: 30%;
    }
  }
`;
const CategoryPage = () => {
  const { slug } = useParams();
  useScrollOnTop(slug);
  const { categories } = useOutletContext();
  const { name: categoryValue } = categories.find(
    category => category.slug === slug
  );

  return (
    <CategoryPageStyled>
      {categoryValue && (
        <Fragment>
          <h2 className="categoryPage-title">
            {categoryValue === 'Food n Drink'
              ? 'FOOD & DRINK'
              : categoryValue.toUpperCase()}
          </h2>
          <div className="categoryPage-gap">
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
          </div>
          <ListPost
            whereField="category"
            whereValue={categoryValue}
            reRenderCondition={categoryValue}
          />
        </Fragment>
      )}
    </CategoryPageStyled>
  );
};

export default CategoryPage;
