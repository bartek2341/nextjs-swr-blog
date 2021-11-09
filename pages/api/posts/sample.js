import nc from "next-connect";
import { mongodb, requiredIp, createPostLimiter } from "@/middlewares/index";
import { randomNumbers } from "@/lib/index";
import getSlug from "speakingurl";
import { createPost } from "@/mongodb/index";
import { SAMPLE_DATA_LENGTH } from "@/data/index";

const handler = nc();

handler.use(requiredIp).use(createPostLimiter).use(mongodb);

handler.get(async (req, res) => {
  const { ip, db } = req;

  for (let i = 0; i <= SAMPLE_DATA_LENGTH; i++) {
    const title = "example post" + "-" + randomNumbers();
    const slug = getSlug(title, {
      lang: "pl",
    });

    await createPost(
      {
        title,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        slug,
      },
      ip,
      db
    );
  }

  res.status(200).end();
});

export default handler;
