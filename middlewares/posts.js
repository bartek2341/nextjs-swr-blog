import { findPostById } from "@/mongodb/index";
import { canLikePost } from "@/data/index";

export const setPost = async (req, res, next) => {
  const { query, db } = req;
  const { id } = query;
  const post = await findPostById(id, db);
  if (post == null) {
    return res.status(404).end();
  }
  req.post = post;
  next();
};

export const likePost = async (req, res, next) => {
  const { post, ip } = req;
  if (!canLikePost(post, ip)) {
    return res.status(403).end();
  }
  next();
};
