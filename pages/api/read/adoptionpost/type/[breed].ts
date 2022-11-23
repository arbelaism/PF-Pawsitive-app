import { prisma } from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const breed = req.query.breed;
  try {
    if (breed) {
      const post = await prisma.adoptionPost.findUnique({
        where: {
          breed: String(breed),
        },
      });

      if (post) res.status(200).json(post);
      else
        return res
          .status(401)
          .json({ message: `cant match results for type ${breed}` });
    }
  } catch (error) {
    console.log(error);
  }
}
