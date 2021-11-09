import { useRouter } from "next/router";
import { Nav, Header, Footer } from "@/components/index";
import styled from "styled-components";
import { respondTo } from "@/lib/index";

const Layout = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;
  const isLoginPage = path === "/secret";

  return isLoginPage ? (
    <main>{children}</main>
  ) : (
    <>
      <Header />
      <Stretch>
        <Nav />
        <main>{children}</main>
      </Stretch>
      <Footer />
    </>
  );
};

export default Layout;

const Stretch = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xl};
  ${respondTo.sm`
   padding: ${({ theme }) => theme.spacing.md} ${({ theme }) =>
    theme.spacing.lg}
    ${({ theme }) => theme.spacing.xl};
  `} ${respondTo.lg`
   padding: ${({ theme }) => theme.spacing.md} ${({ theme }) =>
    theme.spacing.xl}
    ${({ theme }) => theme.spacing.xl};
  `};
`;
