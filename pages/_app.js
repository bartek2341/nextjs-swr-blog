import { theme, TOAST_CLOSE_TIME, nprogressConfig } from "@/data/index";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { ToastContainer, Slide, toast } from "react-toastify";
import { AuthProvider } from "@/firebase/auth";
import { respondTo } from "@/lib/index";
import { Layout } from "@/components/index";
import NProgress from "nprogress";
import Router from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure(nprogressConfig);

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer
        autoClose={TOAST_CLOSE_TIME}
        position={toast.POSITION.TOP_RIGHT}
        transition={Slide}
      />
      <AuthProvider>
        <SWRConfig value={{ provider: () => new Map() }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </AuthProvider>
      <div id="modal"></div>
    </ThemeProvider>
  );
};

export default MyApp;

const GlobalStyles = createGlobalStyle`
${reset}
 
body {
 font-family: ${({ theme }) => theme.fontFamily};
 font-size: ${({ theme }) => theme.fontSizes.md};
 background: ${({ theme }) => theme.colors.black};
 line-height: 1.5;
 color: ${({ theme }) => theme.colors.white};
}

#__next {
 display: flex;
 flex-direction: column;
 min-height: 100vh;
}

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${({ theme }) => theme.colors.gold.light};
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.gold.dark}, 0 0 5px ${({
  theme,
}) => theme.colors.gold.dark};
  opacity: 1.0;
  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}


.Toastify__progress-bar {
 background-color: transparent;
}

.Toastify__toast--error,
.Toastify__toast--success {
 color: ${({ theme }) => theme.colors.white};
 background: ${({ theme }) => theme.colors.gold.light};
}

::-webkit-scrollbar {
  width: ${({ theme }) => theme.spacing.xs};
}
 
::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.colors.gold.dark};
  border-radius: ${({ theme }) => theme.spacing.xs};
}

::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.colors.gold.light};
}
::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.colors.gray.dark};
}

 button {
  outline: none;
  &:focus-visible {
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.colors.white};
  }
 }

 h1 {
  font-size: ${({ theme }) => theme.fontSizes.titleLg};
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.titleXl};
  `}
 }

 h2 {
  font-size: ${({ theme }) => theme.fontSizes.titleSm};
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.titleMd};
  `}
  }

 h3, h4 {
  font-size: ${({ theme }) => theme.fontSizes.xl};
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.titleSm};
  `}
 }

 input,
 textarea {
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing.xs};
  transition: border 0.15s ease;
  outline: none;
  background:  ${({ theme }) => theme.colors.black};
    &:focus {
      border-color: ${({ theme }) => theme.colors.gray.light};
    }
  }

  input[type='text'],
  input[type='password'],
  input[type='email'],
  textarea {
    padding: ${({ theme }) => theme.spacing.sm};
  }
}
`;
