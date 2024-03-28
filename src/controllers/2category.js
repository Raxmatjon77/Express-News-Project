const Category = require("../models/category");


class CategoryController{
    async createCategory(req, res, next) {
        const name = req.body.name
     if(!name){
        return res.status(404).json({message:'no name provided !'});
     }
        let existone;
        try {
          existone = await Category.findOne({ name });
        } catch (error) {}
        if (!existone) {
          try {
            const category = await Category.create({ name });
            return res.status(201).json({
              message: "category created successfully !",
              category: category,
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          return res.status(404).json({
            message:
              "this category is already exists !,try with another name !",
          });
        }
    }
    async getAllCategory(req, res, next) {
          let categories;
          try {
            categories = await Category.find();
          } catch (error) {
            console.log(error);
          }
          if (!categories) {
            console.log(categories);
            return res.status(404).json({
              message: "no categories found",
            });
          }
          console.log(".....>>>");
          return res.status(200).json({
            data: categories,
          });
    }
}
module.exports = new CategoryController();
