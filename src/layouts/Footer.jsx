import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';

const FooterStyled = styled.div`
  width: 100%;

  .footer-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 1280px;
    max-width: 85vw;
    border-top: solid 1px #ccc;
    margin: 0 auto;
    padding: 48px 0 36px;
  }
  .footer-category,
  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: ${props => props.theme.color.brown};
    font-size: 15px;

    a {
      margin-bottom: 12px;
      span {
        display: block;
        padding: 0 24px;
        border-right: solid 1px #ccc;
      }
    }
    a:last-child {
      span {
        border-right: unset;
      }
    }

    a:hover {
      span {
        color: ${props => props.theme.color.brown};
        background-color: ${props => props.theme.color.skin};
      }
    }
  }
  .footer-text {
    font-size: 15px;
    margin-top: 8px;
  }
`;

const footerLinks = [
  {
    name: 'About Us',
    path: '/',
  },
  {
    name: 'Contact Us',
    path: '/',
  },
  {
    name: 'Privacy Policy',
    path: '/',
  },
];

const Footer = () => {
  const { categories } = useFirebase();
  const navigateTo = useNavigate();
  return (
    <FooterStyled>
      <div className="footer-wrap">
        <div className="footer-category">
          {categories &&
            categories.map(category => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={e => {
                  e.preventDefault();
                  navigateTo(`/category/${category.slug}`);
                  document.documentElement.scrollTop = 0;
                }}
              >
                <span>
                  {category.name === 'Food n Drink'
                    ? 'Food & Drink'
                    : category.name}
                </span>
              </a>
            ))}
        </div>
        <div className="footer-links">
          {footerLinks.map((link, index) => (
            <a
              key={`${link.name}-${index}`}
              href={link.path}
              onClick={e => {
                e.preventDefault();
                document.documentElement.scrollTop = 0;
              }}
            >
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <span className="footer-text">
          © 2021 IDEXX Laboratories, Inc. All rights reserved.
        </span>
      </div>
    </FooterStyled>
  );
};

export default Footer;
