import styled from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';

const FooterStyled = styled.div`
  width: 100%;

  .footer-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 1280px;
    border-top: solid 1px #ccc;
    margin: 0 auto;
    padding: 48px 0 36px;
  }
  .footer-category,
  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 12px; */
    color: ${props => props.theme.color.brown};
    font-size: 15px;

    a {
      padding: 0 24px;
      border-right: solid 1px #ccc;
    }
    a:last-child {
      border-right: unset;
    }

    a:hover {
      color: ${props => props.theme.color.brown};
      background-color: ${props => props.theme.color.skin};
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
  return (
    <FooterStyled>
      <div className="footer-wrap">
        <div className="footer-category">
          {categories &&
            categories.map(category => (
              <a key={category.id} href="/" onClick={e => e.preventDefault()}>
                {category.name === 'Food n Drink'
                  ? 'Food & Drink'
                  : category.name}
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
              }}
            >
              {link.name}
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
