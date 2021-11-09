import nc from "next-connect";
import { mongodb, setIp } from "@/middlewares/index";
import { findAllPosts } from "@/mongodb/index";
import { sortPostsByLikes, paginatePosts } from "@/lib/index";

const handler = nc();

handler.use(setIp).use(mongodb);

handler.get(async (req, res) => {
  const { ip } = req;
  const { page, limit } = req.query;
  const posts = await findAllPosts(req.db);
  const sortedPosts = sortPostsByLikes(posts);
  const paginatedPosts = paginatePosts(page, limit, sortedPosts, ip);
  res.status(200).json(paginatedPosts);
});

export default handler;
