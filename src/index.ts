import express from "express";
import path from "path";
import { Comment, PrismaClient } from "@prisma/client";

// server setup

const prisma = new PrismaClient();

console.log("Starting server....");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.listen(3000, () => console.log(`Server started on port: ${PORT}`));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.render("posts", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.post("/posts", async (req, res) => {
  try {
    await prisma.post.create({
      data: req.body,
    });
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.post("/comments", async (req, res) => {
  try {
    const { postId, content } = req.body;
    await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
      },
    });
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.get("/comments", async (req, res) => {
  const { postId } = req.query;

  let comments: Comment[] = [];

  if (postId) {
    comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });
  }

  res.render("comments", { comments });
});
