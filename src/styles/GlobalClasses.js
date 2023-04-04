import { css } from 'styled-components';

export const GlobalClasses = css`
  body {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9f9f9;
  }
  body::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }

  body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #a9a9a990;
    -webkit-background-clip: padding-box; /* for Safari */
    background-clip: padding-box;
  }

  /* #root {
    height: 100%;
  } */

  .hidden {
    display: none !important;
  }

  /* Sweet Alert */
  .swal2-popup .swal2-styled:focus {
    box-shadow: none !important;
  }

  body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {
    overflow: unset !important;
  }

  /* Toastify */
  :root {
    --toastify-icon-color-info: #dd814c !important;
    --toastify-color-progress-info: #dd814c !important;
  }

  /* React quill */
  .entry-content,
  .entry-content .ql-snow .ql-editor {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    h2,
    h3,
    h4 {
      font-weight: bold;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 32px;
    }
    h3 {
      font-size: 26px;
    }
    h4 {
      font-size: 22px;
    }
    p {
      margin-bottom: 20px;
      line-height: 2;
      text-align: justify;
    }
    figure {
      margin-bottom: 20px;
    }
    figure img {
      border-radius: 20px;
      margin-bottom: 10px;
    }
    figcaption {
      text-align: center;
      font-style: italic;
      font-size: 14px;
      color: #6b6b6b;
    }
    ul li {
      list-style: disc !important;
      line-height: 2;
    }
    ol li {
      list-style-type: decimal !important;
      line-height: 2;
    }
    ul,
    ol {
      margin-bottom: 20px;
      padding-left: 40px;
      margin-left: 0;
      li {
        margin-bottom: 10px;
        text-align: justify;
      }
    }
    img {
      border-radius: 8px;
      margin-bottom: 30px;
      margin: 0 auto;
    }
    @media screen and (max-width: 1023.98px) {
      font-size: 14px;
      h2 {
        font-size: 26px;
      }
      h3 {
        font-size: 24px;
      }
      h4 {
        font-size: 20px;
      }
    }
  }
  .entry-content {
    ul li {
      padding-left: 24px;
    }
    ol li {
      padding-left: 24px;
    }
  }
  .ql-editor ul > li::before,
  .ql-editor ol > li::before {
    content: '';
  }
`;
