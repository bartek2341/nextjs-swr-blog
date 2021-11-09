import { useState } from "react";
import { MongoClient } from "mongodb";
import mongoConfig from "@/mongodb/connect";
import { usePost } from "@/hooks/index";
import { findPostBySlug } from "@/mongodb/index";
import useTranslation from "next-translate/useTranslation";
import { toJson, modifyPost, truncate } from "@/lib/index";
import { Post, AddPostModal, MainButtons } from "@/components/index";
import { MAX_META_DESCRIPTION_LENGTH } from "@/data/index";
import Head from "next/head";
import requestIp from "request-ip";
import { useSWRConfig } from "swr";

export default function PostPage({ initPost }) {
  const [data, { mutate }] = usePost(initPost);
  let { t } = useTranslation();
  const [isModalActive, setModalActive] = useState(false);
  const { title, text, slug, createdAt } = data;

  const { cache } = useSWRConfig();

  const likeMutation = () => {
    mutate({ ...data, likedBy: data.likedBy + 1, canLike: false }, false);
  };

  const deleteMutation = () => {
    cache.clear(`/api/posts/${initPost._id}`);
  };

  return (
    <>
      <Head>
        <title>
          {t("common:siteTitle")} - {title}
        </title>
        <meta
          name="description"
          content={truncate(text, MAX_META_DESCRIPTION_LENGTH)}
        />
      </Head>
      {isModalActive && (
        <AddPostModal
          setModalActive={setModalActive}
          mutateRedirection={true}
        />
      )}
      <MainButtons setModalActive={setModalActive} />
      <Post
        post={data}
        likeMutation={likeMutation}
        deleteMutation={deleteMutation}
        deleteRedirection={true}
      />
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const ip = requestIp.getClientIp(req);

  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  const db = global.mongo.client.db(process.env.MONGODB_NAME);

  const slug = query.post;
  const post = await findPostBySlug(slug, db);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const data = modifyPost(post, ip);

  return {
    props: {
      initPost: toJson(data),
    },
  };
}
