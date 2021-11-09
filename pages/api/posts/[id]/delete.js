import nc from "next-connect";
import { deletePostById } from "@/mongodb/index";
import {
  mongodb,
  setPost,
  auth,
  deletePostLimiter,
  setIp,
} from "@/middlewares/index";

const handler = nc();
handler.use(setIp).use(deletePostLimiter).use(auth).use(mongodb).use(setPost);

handler.delete(async (req, res) => {
  const { post, db } = req;
  const id = await deletePostById(post._id, db);
  res.status(200).json(id);
});

export default handler;
