import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Wrapper } from "@/components/index";

const Header = () => {
  let { t } = useTranslation();
  return (
    <header>
      <HeaderWrapper>
        <h1>{t("common:siteTitle")}</h1>
        <h2>{t("common:siteDescription")}</h2>
      </HeaderWrapper>
    </header>
  );
};

export default Header;

const HeaderWrapper = styled(Wrapper)`
  background: ${({ theme }) => theme.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-weight: bold;
`;
