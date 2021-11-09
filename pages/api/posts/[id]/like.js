import nc from "next-connect";
import {
  mongodb,
  requiredIp,
  setPost,
  likePostLimiter,
  likePost,
} from "@/middlewares/index";
import { updatePost } from "@/mongodb/index";
import { modifyPost } from "@/lib/index";

const handler = nc();
handler
  .use(requiredIp)
  .use(likePostLimiter)
  .use(mongodb)
  .use(setPost)
  .use(likePost);

handler.put(async (req, res) => {
  const { post, ip, db } = req;
  const updatedPost = await updatePost(post._id, ip, db);
  res.status(200).json(modifyPost(updatedPost, ip));
});

export default handler;
