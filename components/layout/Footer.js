import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Footer = () => {
  let { t } = useTranslation();

  return (
    <FooterWrapper>
      <Link href={`${process.env.NEXT_PUBLIC_REPO_URL}`}>
        <a>{t("common:repo")}</a>
      </Link>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.gray.dark};
  background-color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-align: center;
  a {
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      color: ${({ theme }) => theme.colors.gray.light};
    }
  }
`;
