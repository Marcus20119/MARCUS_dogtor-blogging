import { css } from 'styled-components';

export const GlobalClasses = css`
  body {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9f9f9;
  }
  body::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: transparent;
  }

  body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #a9a9a945;
    -webkit-background-clip: padding-box; /* for Safari */
    background-clip: padding-box;
  }
  .small-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
  }
`;
