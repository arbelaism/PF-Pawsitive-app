import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, active } = req.body;
  try {
    const post = await prisma.adoptionPost.update({
      where: { id: String(id) },
      data: {
        active,
      },
    });
    post
      ? res.status(200).json({ message: "adoption Post logic delete" })
      : res.status(400).json({
          message: "the adoption Post does not exist in the database.",
        });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
}
