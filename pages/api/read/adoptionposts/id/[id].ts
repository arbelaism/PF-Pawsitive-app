import { prisma } from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.query;
  try {
    if (id) {
      const post = await prisma.adoptionPost.findMany({
        where: {
          id: String(id),
        },
      });
      if (post.length > 0) res.status(200).json(post);
      else
        return res
          .status(401)
          .json({ message: `cant match results for type ${id}` });
    }
  } catch (error) {
    console.log(error);
  }
}
