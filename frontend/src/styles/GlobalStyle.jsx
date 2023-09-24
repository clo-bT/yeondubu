import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    :root {
      --vh: 100%;
    };
    body {
        height: 100vh;
        height: var(--vh);
    };
    .scroll {
      overflow: hidden;
    }
    
`
export default GlobalStyle;