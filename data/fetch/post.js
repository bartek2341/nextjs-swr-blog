export const createPostFetch = (values) => {
  const promise = fetch(`/api/posts/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return promise;
};

export const likePostFetch = (postId) => {
  const promise = fetch(`/api/posts/${postId}/like`, {
    method: "PUT",
  });
  return promise;
};

export const deletePostFetch = (postId) => {
  const promise = fetch(`/api/posts/${postId}/delete`, {
    method: "DELETE",
  });
  return promise;
};

export const samplePostsFetch = () => {
  const promise = fetch(`/api/posts/sample`, {
    method: "GET",
  });
  return promise;
};
