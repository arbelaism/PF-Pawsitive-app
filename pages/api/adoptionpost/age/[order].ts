import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const order: string | undefined | string[] = req.query.order;
  try {
    const posts = await prisma.adoptionPost.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        size: true,
        age: true,
        breed: true,
        photo: true,
        active: true,
        description: true,
        createdAt: true,
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
    res.status(200).json(buildName(order, posts));
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error: " + error });
  }
}
function buildName(
  order: string | undefined | string[],
  data: any[]
): object[] {
  let orderPost: any[] = [];
  if (order === "min") {
    let years = data.filter((post) => post.age.includes("años"));
    let months = data.filter((post) => post.age.includes("meses"));
    orderPost = postJoin(years, months, 1);
  } else {
    let years = data.filter((post) => post.age.includes("años"));
    let months = data.filter((post) => post.age.includes("meses"));
    orderPost = postJoin(years, months, -1);
  }
  return orderPost;
}
function postJoin(years: any[], months: any[], order: number): any[] {
  let orderPost: any[] = [];
  console.log(order);
  orderPost = months
    .sort((a, b) => {
      console.log(typeof a);
      const nameA = parseInt(a.age.slice(0, 2));
      const nameB = parseInt(b.age.slice(0, 2));
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .concat(
      years.sort((a, b) => {
        const nameA = parseInt(a.age.slice(0, 2));
        const nameB = parseInt(b.age.slice(0, 2));
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    );
  if (order < 0) orderPost = orderPost.reverse();
  return orderPost;
}
