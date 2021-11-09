import styled from "styled-components";
import Link from "next/link";
import { respondTo } from "@/lib/index";
import useTranslation from "next-translate/useTranslation";

const MainButtons = ({ setModalActive, isTopPage }) => {
  let { t } = useTranslation();

  return (
    <Wrapper>
      <button onClick={() => setModalActive(true)}>
        {t("common:addPost")}
      </button>
      {isTopPage ? (
        <Link href="/">
          <a>{t("common:latest")}</a>
        </Link>
      ) : (
        <Link href="/top100">
          <a>{t("common:top100")}</a>
        </Link>
      )}
    </Wrapper>
  );
};

export default MainButtons;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  a,
  button {
    margin: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.spacing.xs};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSizes.md};
    transition: background 0.2s ease, color 0.2s ease;
    line-height: 1.5;
    padding: 5px 6px;
    cursor: pointer;
    text-shadow: ${({ theme }) => theme.shadows.text};
    ${respondTo.sm`
      font-size: ${({ theme }) => theme.fontSizes.lg};
      padding: 7px 10px;
    `}
  }
  button {
    background-color: ${({ theme }) => theme.colors.gold.light};
    box-shadow: ${({ theme }) => theme.shadows.gold};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    &:hover {
      color: ${({ theme }) => theme.colors.gray.light};
      background-color: ${({ theme }) => theme.colors.gold.dark};
    }
  }
  a {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.gray.dark};
    color: ${({ theme }) => theme.colors.gray.light};
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.gray.dark};
    }
  }
`;
