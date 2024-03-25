const { Router } = require("express");
const newsRouter = Router();
const upload=require("../utils/upload")
const CategoryController=require("../controllers/category")


newsRouter.post("/category/create",CategoryController.createCategory);
newsRouter.get("/category/getAll", CategoryController.getAllCategory);
newsRouter.post("/upload", upload.single("file"));




module.exports = newsRouter;
