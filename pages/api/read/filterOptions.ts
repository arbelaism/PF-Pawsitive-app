import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface Filters {
  size: string[];
  breed: string[];
  years: string[];
  months: string[];
}

export default async function getFilters(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const limitYears = 20;
  const limitMonths = 11;
  try {
    let posts = await prisma.adoptionPost.findMany({
      where: {
        active: true,
      },
    });
    let result: Filters = { size: [], breed: [], years: [], months: [] };
    result.size = ["SMALL", "MEDIUM", "BIG"];
    posts.map((p) => {
      if (!result.breed.includes(p.breed)) {
        result.breed.push(p.breed);
      }
    });
    for (let i = 0; i <= limitYears; i++) {
      if (i < 12) {
        result.months.push(`${i}`);
        result.years.push(`${i}`);
      } else {
        result.years.push(`${i}`);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error: " + error });
  }
}
