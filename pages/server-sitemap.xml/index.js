import { getServerSideSitemap } from "next-sitemap";
import { findAllPosts } from "@/mongodb/index";
import { MongoClient } from "mongodb";
import mongoConfig from "@/mongodb/connect";
import { dateRange, getCurrentDate } from "@/lib/index";
import { DATE_RANGE_FROM } from "@/data/index";

export const getServerSideProps = async (ctx) => {
  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  const db = global.mongo.client.db(process.env.MONGODB_NAME);

  const allPosts = await findAllPosts(db);

  const posts = allPosts.map((post) => ({
    loc: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const dates = dateRange(DATE_RANGE_FROM, getCurrentDate()).map((date) => ({
    loc: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${date}`,
    lastmod: new Date().toISOString(),
  }));
  const fields = [...posts, ...dates];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
