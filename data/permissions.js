export const canLikePost = (post, clientIp) => {
  if (post.authorIp === clientIp) return false;
  return !post.likedBy.includes(clientIp);
};
