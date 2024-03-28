const { Router } = require("express");
const newsRouter = Router();
const upload=require("../utils/upload")
const CategoryController=require("../controllers/2category")
const NewsController=require("../controllers/3news-controller")

newsRouter.post("/category/create",CategoryController.createCategory);
newsRouter.get("/category/getAll", CategoryController.getAllCategory);
newsRouter.post("/create",upload('uploads/news-photos').single("file"), NewsController.createNews);

// newsRouter.post("/upload", );




module.exports = newsRouter;
