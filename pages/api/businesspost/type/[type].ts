import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = req.query.type as string;
  try {
    const professionals = await prisma.businessPost.findMany();
    const result = professionals.filter((prof) => prof.type === type.toUpperCase());
    if (result.length > 0) res.status(200).json(result);
    else
      return res
        .status(401)
        .json({ message: `cant match results for type ${type}` });
  } catch (error) {
    console.log(error);
  }
}
