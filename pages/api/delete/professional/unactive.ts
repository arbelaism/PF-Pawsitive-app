import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, active } = req.body;
  try {
    const professional = await prisma.professionalBusiness.update({
      where: { id: String(id) },
      data: {
        active,
      },
    });
    professional
      ? res.status(200).json({ message: "professional logic delete" })
      : res.status(400).json({
          message: "the professional does not exist in the database.",
        });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
}
