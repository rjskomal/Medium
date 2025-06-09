import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { updateBlogInput, createBlogInput } from "@rjskomal/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "Authorization header missing or invalid format" });
  }

  const token = header.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "You are not logged in" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "You ain't logged in mah boy" });
  }
});


blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId,
    },
  });

  return c.json({ id: blog.id });
});


blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id });
  } catch {
    c.status(404);
    return c.json({ error: "Blog not found" });
  }
});


blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      authorId: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});


blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: c.req.param("id"),
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId : true,
        author: {
          select: { name: true },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }

    return c.json({ blog });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});
