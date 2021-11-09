import nc from "next-connect";
import { mongodb, setIp, setPost } from "@/middlewares/index";
import { modifyPost } from "@/lib/index";

const handler = nc();
handler.use(setIp).use(mongodb).use(setPost);

handler.get(async (req, res) => {
  const { post, ip } = req;
  res.status(200).json(modifyPost(post, ip));
});

export default handler;
