import nc from "next-connect";
import { mongodb, setIp } from "@/middlewares/index";
import { findAllPosts } from "@/mongodb/index";
import {
  scopePostsByDate,
  sortPostsByLikes,
  sortPostsByDate,
  paginatePosts,
} from "@/lib/index";

const handler = nc();

handler.use(setIp).use(mongodb);

handler.get(async (req, res) => {
  const { db, query, ip } = req;
  const { page, limit, date } = query;
  let allPosts = await findAllPosts(db);
  let sortedPosts;

  if (date) {
    const scopedPosts = scopePostsByDate(allPosts, date);
    sortedPosts = sortPostsByLikes(scopedPosts);
  } else {
    sortedPosts = sortPostsByDate(allPosts);
  }

  const posts = paginatePosts(page, limit, sortedPosts, ip);
  res.status(200).json(posts);
});
export default handler;
