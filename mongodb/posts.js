const ObjectId = require("mongodb").ObjectId;

export async function findAllPosts(db) {
  return db.collection("posts").find().toArray();
}

export async function createPost(post, clientIp, db) {
  return db.collection("posts").insertOne({
    ...post,
    likedBy: [],
    authorIp: clientIp,
    createdAt: new Date(),
  });
}

export async function findPostById(postId, db) {
  return db.collection("posts").findOne({ _id: ObjectId(postId) });
}

export async function updatePost(postId, clientIp, db) {
  return db
    .collection("posts")
    .findOneAndUpdate(
      { _id: ObjectId(postId) },
      { $push: { likedBy: clientIp } },
      { returnOriginal: false }
    )
    .then(({ value }) => value);
}

export const deletePostById = (postId, db) => {
  return db
    .collection("posts")
    .findOneAndDelete({ _id: postId })
    .then(({ value }) => value._id);
};

export async function findPostBySlug(slug, db) {
  return db.collection("posts").findOne({ slug });
}
