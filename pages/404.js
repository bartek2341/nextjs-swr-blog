import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

export default function Custom404() {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("common:pageDoesntExist")}</title>
        <meta name="description" content={t("common:pageDoesntExist")} />
      </Head>
      <Wrapper>
        <h1>{t("common:pageDoesntExist")}</h1>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
