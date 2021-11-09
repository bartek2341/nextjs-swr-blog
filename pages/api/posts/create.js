import nc from "next-connect";
import { mongodb, requiredIp, createPostLimiter } from "@/middlewares/index";
import {
  titleServerValidation,
  textServerValidation,
  randomNumbers,
  modifyPost,
} from "@/lib/index";
import getSlug from "speakingurl";
import { createPost, findPostById } from "@/mongodb/index";

const handler = nc();

handler.use(requiredIp).use(createPostLimiter).use(mongodb);

handler.post(async (req, res) => {
  const { ip, db, body } = req;
  const { title, text } = body;
  const isTitleValid = titleServerValidation(title);
  const isTextValid = textServerValidation(text);
  if (!isTitleValid || !isTextValid) return res.status(400).end();

  const slug = getSlug(title, {
    lang: "pl",
  });

  const uniqueSlug = slug + "-" + randomNumbers();

  const { insertedId } = await createPost(
    { ...body, slug: uniqueSlug },
    ip,
    db
  );
  const post = await findPostById(insertedId, db);
  res.status(200).json(modifyPost(post, ip));
});

export default handler;
