import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MongoClient } from "mongodb";
import { mongoConfig } from "@/mongodb/connect";
import {
  LoadingIndicator,
  PageTitle,
  AddPostModal,
  MainButtons,
  Post,
  Button,
} from "@/components/index";
import { findAllPosts } from "@/mongodb/index";
import {
  sortPostsByLikes,
  toJson,
  getCurrentDate,
  scopePostsByDate,
  dateRange,
  paginatePosts,
} from "@/lib/index";
import { PAGE_SIZE, DATE_RANGE_FROM } from "@/data/index";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import requestIp from "request-ip";
import { useInfiniteDatePosts, useOnScreen } from "@/hooks/index";
import { useRouter } from "next/router";

export default function Home({ initPosts }) {
  const [isModalActive, setModalActive] = useState(false);
  let { t } = useTranslation();
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const router = useRouter();
  const { date } = router.query;
  const { data, error, mutate, size, setSize } = useInfiniteDatePosts(
    initPosts,
    date
  );

  const posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    if (isVisible && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [isVisible]);

  const likeMutation = (id) => {
    mutate(
      (data) =>
        data.map((array) =>
          array.map((post) =>
            post._id === id
              ? {
                  ...post,
                  likedBy: post.likedBy + 1,
                  canLike: false,
                }
              : post
          )
        ),
      false
    );
  };

  const deleteMutation = (id) => {
    mutate(
      (data) => data.map((array) => array.filter((post) => post._id !== id)),
      false
    );
  };

  return (
    <>
      <Head>
        <title>
          {t("common:bestOf")} {date}
        </title>
        <meta name="description" content={t("common:siteDescription")} />
      </Head>
      {isModalActive && (
        <AddPostModal
          setModalActive={setModalActive}
          posts={posts}
          mutate={mutate}
          mutateRedirection={true}
        />
      )}
      <>
        <MainButtons setModalActive={setModalActive} />
        <PageTitle>
          {t("common:bestOf")} {date}
        </PageTitle>
        {isEmpty ? (
          <Center>{t("common:noPosts")}</Center>
        ) : (
          <>
            {posts.map((post) => (
              <Post
                key={post._id}
                titleLink={true}
                post={post}
                likeMutation={likeMutation}
                deleteMutation={deleteMutation}
              />
            ))}
            <div ref={ref}>
              <Center>
                {isLoadingMore ? (
                  <LoadingIndicator />
                ) : isReachingEnd ? (
                  t("common:noMorePosts")
                ) : (
                  <Button variant="dark" onClick={() => setSize(size + 1)}>
                    {t("common:loadMore")}
                  </Button>
                )}
              </Center>
            </div>
          </>
        )}
      </>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const validDates = dateRange(DATE_RANGE_FROM, getCurrentDate());

  if (!validDates.includes(query.date)) {
    return {
      notFound: true,
    };
  }
  const ip = requestIp.getClientIp(req);

  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  const db = global.mongo.client.db(process.env.MONGODB_NAME);

  const posts = await findAllPosts(db);
  const scopedPosts = scopePostsByDate(posts, query.date);
  const sortedPosts = sortPostsByLikes(scopedPosts);
  const paginatedPosts = paginatePosts(1, PAGE_SIZE, sortedPosts, ip);

  return {
    props: {
      initPosts: toJson(paginatedPosts),
    },
  };
}

const Center = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;
