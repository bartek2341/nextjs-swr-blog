import { getMonthDate } from ".";
import { canLikePost } from "@/data/index";

export const sortPostsByDate = (data) => {
  return data.sort(function compare(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export const modifyPost = (post, ip) => ({
  ...post,
  authorIp: undefined,
  likedBy: post.likedBy.length,
  canLike: canLikePost(post, ip),
});

export const paginatePosts = (queryPage, queryLimit, posts, ip) => {
  const page = parseInt(queryPage);
  const limit = parseInt(queryLimit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return posts.slice(startIndex, endIndex).map((post) => modifyPost(post, ip));
};

export const scopePostsByDate = (posts, date) => {
  return posts.filter((post) => {
    var [year, month] = getMonthDate(post.createdAt).split("-");
    return (
      new Date(date).getMonth() + 1 === +month &&
      new Date(date).getFullYear() == year
    );
  });
};

export const sortPostsByLikes = (posts) => {
  return posts.sort(function compare(a, b) {
    return b.likedBy.length - a.likedBy.length;
  });
};
