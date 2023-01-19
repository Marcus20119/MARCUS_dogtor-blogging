import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TabGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .tabGroup {
    &__title {
      margin: 8px 0 8px;
      padding-left: 12px;
      font-weight: 600;
      line-height: 18px;
      opacity: 0.8;
      color: ${props => props.theme.color.black};
      font-family: ${props => props.theme.font.tertiary};
      text-shadow: 0 0 1px ${props => props.theme.color.brown};
      border-left: solid 3px #181818;
    }
    &__tab {
      margin: 2px 0;
      padding: 4px 0;
      font-weight: 400;
      line-height: 18px;
      color: ${props => props.theme.color.black};
      font-family: ${props => props.theme.font.tertiary};
      &:hover {
        opacity: 1;
        color: ${props => props.theme.color.brown};
      }
    }
  }
`;

const TabGroup = ({ categories, title, groupIndex, setShow }) => {
  const navigateTo = useNavigate();
  return (
    <TabGroupStyled>
      <div className="tabGroup__title">{title}</div>
      {categories.map(
        category =>
          category.group === groupIndex && (
            <Link
              key={`tabGroup-${category.slug}`}
              to={`/category/${category.slug}`}
              className="tabGroup__tab"
              onClick={e => {
                e.preventDefault();
                navigateTo(`/category/${category.slug}`);
                setShow(false);
              }}
            >
              {category.name === 'Food n Drink'
                ? 'Food & Drink'
                : category.name}
            </Link>
          )
      )}
    </TabGroupStyled>
  );
};

export default TabGroup;
