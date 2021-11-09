import { useState } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useAuth } from "@/firebase/auth";
import { toast } from "react-toastify";
import { formatDate } from "@/lib/index";
import { likePostFetch, deletePostFetch } from "@/data/index";
import { Button, DeletePostModal } from "@/components/index";
import router from "next/router";

const Post = ({
  post,
  titleLink,
  likeMutation,
  deleteRedirection,
  deleteMutation,
}) => {
  const [deletePost, setDeletePost] = useState(null);
  let { t } = useTranslation();
  const { user } = useAuth();
  const { title, text, createdAt, slug, _id, likedBy, canLike } = post;

  const onSubmit = async () => {
    try {
      const res = await likePostFetch(_id);
      if (res.ok) {
        likeMutation(_id);
      } else if (res.status === 429) {
        toast.error(t("common:spamAlert"));
      } else if (res.status === 401) {
        toast.error(t("common:requiredIp"));
      } else if (res.status === 403) {
        toast.error(t("common:postAlreadyLiked"));
      } else {
        toast.error(t("common:likePostError"));
      }
    } catch (err) {
      toast.error(t("common:serverError"));
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await deletePostFetch(_id);
      if (res.ok) {
        deleteMutation(_id);
        deleteRedirection && router.push("/");
      } else if (res.status === 429) {
        toast.error(t("common:spamAlert"));
      } else {
        toast.error(t("common:deletePostError"));
      }
    } catch (err) {
      toast.error(t("common:serverError"));
    }
  };

  return (
    <>
      {deletePost && (
        <DeletePostModal
          setDeletePost={setDeletePost}
          deletePost={deletePost}
          handleDeletePost={handleDeletePost}
        />
      )}
      <Article>
        <header>
          <h3>
            {titleLink ? (
              <Link href={`/${slug}`}>
                <a>{title}</a>
              </Link>
            ) : (
              title
            )}
          </h3>
          <Description>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            {user && (
              <Button variant={"secondary"} onClick={() => setDeletePost(post)}>
                {t("common:delete")}
              </Button>
            )}
          </Description>
        </header>
        <p>{text}</p>
        <Footer>
          <Button disabled={!canLike} onClick={onSubmit}>
            {t("common:likePost")}
          </Button>
          <div>
            {t("common:likedBy")}{" "}
            {likedBy <= 0
              ? t("common:onlyAuthor")
              : `${likedBy + 1} ${t("common:persons")}`}
          </div>
        </Footer>
      </Article>
    </>
  );
};

export default Post;

const Article = styled.article`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  header {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    div {
      time {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin-right: ${({ theme }) => theme.spacing.xs};
      }
    }
    h3 {
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      a {
        color: ${({ theme }) => theme.colors.white};
        transition: color 0.2s ease;
        text-decoration: none;
        &:hover {
          color: ${({ theme }) => theme.colors.gray.normal};
        }
      }
    }
  }
  p,
  h3 {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    white-space: pre-wrap;
  }
`;

const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  button {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  div {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;
