import Link from "next/link";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { dateRange, getCurrentDate, sortDatesByNewest } from "@/lib/index";
import { DATE_RANGE_FROM } from "@/data/index";
import { useAuth } from "@/firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button } from "@/components/index";

const Nav = () => {
  const router = useRouter();
  const queryDate = router.query.date;
  let { t } = useTranslation();
  const { user, logout } = useAuth();
  const dateArray = sortDatesByNewest(
    dateRange(DATE_RANGE_FROM, getCurrentDate())
  );

  const handleLogout = async () => {
    try {
      await logout();
      toast.error(t("common:logoutSuccess"));
    } catch (err) {
      toast.error(t("common:logoutError"));
    }
  };

  return (
    <Navigation>
      {user && (
        <Button
          variant={"secondary"}
          onClick={() => {
            handleLogout();
          }}
        >
          {t("common:logout")}
        </Button>
      )}
      <span>{t("common:bestOf")}</span>
      <div>
        <DateList>
          {dateArray.map((date) => (
            <li key={date}>
              <Link href={`/posts/${date}`}>
                <a className={date === queryDate ? "active" : ""}>{date}</a>
              </Link>
            </li>
          ))}
        </DateList>
      </div>
    </Navigation>
  );
};

export default Nav;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  span {
    white-space: nowrap;
    margin-top: ${({ theme }) => theme.spacing.xs};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  div {
    width: 300px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.gray.dark};
    border-radius: ${({ theme }) => theme.spacing.xs};
  }
  button {
    position: fixed;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
  }
`;

const DateList = styled.ul`
  display: flex;
  overflow-x: scroll;
  overflow-y: auto;
  white-space: nowrap;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  ::-webkit-scrollbar {
    height: 5px;
  }
  li {
    margin: 0 ${({ theme }) => theme.spacing.xs};
    a {
      color: ${({ theme }) => theme.colors.white};
      text-decoration: none;
      &.active {
        font-weight: bold;
      }
      &:hover:not(.active) {
        color: ${({ theme }) => theme.colors.gray.normal};
      }
    }
  }
`;
