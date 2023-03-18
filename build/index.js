"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
// server setup
const prisma = new client_1.PrismaClient();
console.log("Starting server....");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use(express_1.default.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server started on port: ${PORT}`));
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        res.render("posts", { posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).end();
    }
}));
app.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.post.create({
            data: req.body,
        });
        res.redirect("/posts");
    }
    catch (error) {
        console.error(error);
        res.status(500).end();
    }
}));
app.post("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, content } = req.body;
        yield prisma.comment.create({
            data: {
                content,
                postId: Number(postId),
            },
        });
        res.redirect("/posts");
    }
    catch (error) {
        console.error(error);
        res.status(500).end();
    }
}));
app.get("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    let comments = [];
    if (postId) {
        comments = yield prisma.comment.findMany({
            where: {
                postId: Number(postId),
            },
        });
    }
    res.render("comments", { comments });
}));
