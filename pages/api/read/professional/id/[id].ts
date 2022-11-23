import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  try {
    const professional = await prisma.professionalBusiness.findUnique({
      where: {
        id: String(id),
      },
    });
    if (professional) res.status(200).json(professional);
    else
      return res
        .status(401)
        .json({ message: `cant found an object with id ${id}` });
  } catch (error) {
    console.log(error);
  }
}
